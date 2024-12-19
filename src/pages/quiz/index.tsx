import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";
import { prefetchSSRData } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const HintProvider = dynamic(
  () =>
    import("@/modules/question/context").then(
      (modules) => modules.HintProvider
    ),
  { ssr: false }
);
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
  await prefetchSSRData(["competitions"], "/quiz/competitions/", queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
