import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";
import { prefetchSSRData } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";

interface IndexProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: IndexProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <EnrolledModalProvider>
        <QuizPLP />
      </EnrolledModalProvider>
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const queryClient = await prefetchSSRData(["quizzes"], "quiz/competitions/");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
