import { HintProvider } from "@/modules/question/context";
import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";
import { prefetchSSRData } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface IndexProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: IndexProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <EnrolledModalProvider>
        <HintProvider>
          <QuizPLP />
        </HintProvider>
      </EnrolledModalProvider>
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await prefetchSSRData(["competitions"], "/quiz/competitions/", queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
