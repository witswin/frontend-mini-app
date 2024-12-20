import { EnrolledModalProvider } from '@/modules/quiz/context';
import { Index } from '@/modules/quiz/pdp/page';
import { prefetchSSRData } from '@/utils';
import { Box, Container } from '@chakra-ui/react';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
const HintProvider = dynamic(
  () =>
    import('@/modules/question/context').then(
      (modules) => modules.HintProvider,
    ),
  { ssr: false },
);
interface QuizPDPProps {
  dehydratedState: DehydratedState;
  qrCodeBase64: string;
}
const QuizPDP = ({ dehydratedState }: QuizPDPProps) => {
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <EnrolledModalProvider>
          <HintProvider>
            <Index />
          </HintProvider>
        </EnrolledModalProvider>
      </HydrationBoundary>
    </>
  );
};

export default QuizPDP;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;

  const quizId = query?.id as string;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnMount: true,
        retry: 0,
        gcTime: 0,
      },
    },
  });  await prefetchSSRData(
    ['quiz', quizId],
    `/quiz/competitions/${quizId}/`,
    queryClient,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

QuizPDP.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="16px"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box width="full">{page}</Box>
    </Container>
  );
};
