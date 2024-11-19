import { quizType } from "@/globalTypes";
import {
  CounterProvider,
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

const HintProvider = dynamic(
  () =>
    import("@/modules/question/context").then(
      (modules) => modules.HintProvider
    ),
  { ssr: false }
);
const WebSocketProvider = dynamic(
  () =>
    import("@/context/WebSocket").then((modules) => modules.WebSocketProvider),
  { ssr: false }
);

interface IndexProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: IndexProps) => {
  const quiz = dehydratedState.queries[0].state.data as quizType;

  const timer = quiz.questionTimeSeconds;

  const restTimeSeconds = quiz.restTimeSeconds;

  return (
    <WebSocketProvider>
      <HydrationBoundary state={dehydratedState}>
        <CounterProvider
          timer={timer}
          startAt={quiz.startAt}
          restTimeSeconds={restTimeSeconds}
        >
          <HintProvider>
            <QuestionDataProvider>
              <Question />
            </QuestionDataProvider>
          </HintProvider>
        </CounterProvider>
      </HydrationBoundary>
    </WebSocketProvider>
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

  const isQuizFinished =
    // @ts-expect-error as unknown
    dehydrate(queryClient).queries[0].state.data.isFinished;

  if (isQuizFinished) {
    return {
      redirect: {
        permanent: false,
        destination: `/quiz/${quizId}/result`,
      },
    };
  }
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
