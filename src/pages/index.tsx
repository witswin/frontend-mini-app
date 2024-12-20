import { BottomNavbar } from '@/components/BottomNavbar';
import { axiosClient } from '@/configs/axios';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/constants';
import { useAuth } from '@/hooks/useAuthorization';
import { Home } from '@/modules/home/page';
import { prefetchSSRData } from '@/utils';
import { Box, Container, VStack } from '@chakra-ui/react';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect, useState } from 'react';
interface IndexProps {
  dehydratedState: DehydratedState;
  hasCompetitions?: boolean;
}
const Index = ({ dehydratedState, hasCompetitions }: IndexProps) => {
  const auth = useAuth();
  const [userCompetitions, setUserCompetitions] = useState(hasCompetitions);

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

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="0"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
      userSelect="none"
    >
      <Box px="16px" width="full">
        {page}
      </Box>
      <BottomNavbar />
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnMount: true,
        retry: 0,
        gcTime: 0,
      },
    },
  });
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
