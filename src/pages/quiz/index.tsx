import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";
import { prefetchSSRData } from "@/utils";
import { Container } from "@chakra-ui/react";
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
      <Container
        overflow="hidden"
        minH="100vh"
        py="8px"
        maxWidth="538px"
        px="16px"
      >
        <EnrolledModalProvider>
          <QuizPLP />
        </EnrolledModalProvider>
      </Container>
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
