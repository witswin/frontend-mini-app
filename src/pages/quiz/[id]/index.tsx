import { Index } from "@/modules/quiz/pdp/page";
import { prefetchSSRData } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

interface QuizPDPProps {
  dehydratedState: DehydratedState;
}
const QuizPDP = ({ dehydratedState }: QuizPDPProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Index />
    </HydrationBoundary>
  );
};

export default QuizPDP;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const quizId = query?.id as string;
  const queryClient = new QueryClient();

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
