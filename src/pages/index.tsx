import { axiosClient } from '@/configs/axios';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/constants';
import { useAuth } from '@/hooks/useAuthorization';
import { Home } from '@/modules/home/page';
import { prefetchSSRData } from '@/utils';
import { VStack } from '@chakra-ui/react';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
interface IndexProps {
  dehydratedState: DehydratedState;
  hasCompetitions?: boolean;
}
const Index = ({ dehydratedState, hasCompetitions }: IndexProps) => {
  const auth = useAuth();
  const [userCompetitions, setUserCompetitions] = useState(hasCompetitions);
  console.log({ userCompetitions });

  useEffect(() => {
    const checkUserCompetitions = async () =>
      axiosClient
        .get(`/quiz/${auth?.pk}/competitions/`)
        .then((res) => res.data);
    if (typeof hasCompetitions === 'undefined' && auth?.token) {
      checkUserCompetitions().then((data) =>
        setUserCompetitions(data.length !== 0),
      );
    }
  }, [auth]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <VStack height="full" width="full" alignItems="stretch">
        <Home hasCompetitions={userCompetitions} />
      </VStack>
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;
  await prefetchSSRData(
    ['closetCompetition'],
    '/quiz/competitions/latest',
    queryClient,
  );

  if (accessToken) {
    await prefetchSSRData(
      ['enrolledCompetition'],
      '/quiz/competitions/enroll/',
      queryClient,
      { Authorization: `TOKEN ${accessToken}` },
    );
    const userInfo = await axiosClient
      .get('/auth/info', {
        headers: {
          Authorization: `TOKEN ${accessToken}`,
        },
      })
      .then((res) => res.data);

    if (userInfo) {
      const hasCompetitions = await axiosClient
        .get(`/quiz/${userInfo?.pk}/competitions/`)
        .then((res) => res.data);
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          hasCompetitions: hasCompetitions?.length !== 0,
        },
      };
    }
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
