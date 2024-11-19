import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants";
import { Home } from "@/modules/home/page";
import { prefetchSSRData } from "@/utils";
import { VStack } from "@chakra-ui/react";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
interface IndexProps {
  dehydratedState: DehydratedState;
}
const Index = ({ dehydratedState }: IndexProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <VStack height="full" width="full" alignItems="stretch">
        <Home />
      </VStack>
    </HydrationBoundary>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;
  await prefetchSSRData(
    ["closetCompetition"],
    "/quiz/competitions/latest",
    queryClient
  );

  if (accessToken) {
    await prefetchSSRData(
      ["enrolledCompetition"],
      "/quiz/competitions/enroll/",
      queryClient,
      { Authorization: `TOKEN ${accessToken}` }
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
