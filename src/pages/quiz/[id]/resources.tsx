import { Resources } from "@/modules/quiz/resources/page";
import { prefetchSSRData } from "@/utils";
import { Box, Container } from "@chakra-ui/react";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { ReactElement } from "react-markdown/lib/react-markdown";

interface QuizResourcesProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: QuizResourcesProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Resources />
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const quizId = query?.id as string;
  const queryClient = new QueryClient();

  await prefetchSSRData(
    ["quiz", quizId],
    `/quiz/competitions/${quizId}/`,
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
      px="16px"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box width="full">{page}</Box>
    </Container>
  );
};
