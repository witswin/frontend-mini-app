import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants";
import {
  CounterProvider,
  HintProvider,
  QuestionDataProvider,
} from "@/modules/question/context";
import { prefetchSSRData } from "@/utils";
import { Box, Container } from "@chakra-ui/react";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { ReactElement } from "react";

const Question = dynamic(
  () => import("@/modules/question/page").then((modules) => modules.Question),
  { ssr: false }
);

interface IndexProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: IndexProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <CounterProvider
        timer={dehydratedState.queries[0].state.data.questionTimeSeconds}
      >
        <HintProvider>
          <QuestionDataProvider
            timer={dehydratedState.queries[0].state.data.questionTimeSeconds}
          >
            <Question />
          </QuestionDataProvider>
        </HintProvider>
      </CounterProvider>
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const quizId = query?.id as string;
  const queryClient = new QueryClient();
  // const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;
  // if (!accessToken) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: `/quiz/${quizId}`,
  //     },
  //   };
  // }

  await prefetchSSRData(
    ["quiz", quizId],
    `quiz/competitions/${quizId}/`,
    queryClient
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
    >
      <Box width="full">{page}</Box>
    </Container>
  );
};
