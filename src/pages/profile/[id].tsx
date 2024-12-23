import { Profile } from "@/modules/profile/page";
import { prefetchSSRData } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

const Index = ({ dehydratedState }: { dehydratedState: DehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Profile />
    </HydrationBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { query } = ctx;
  const profileId = query.id as string;
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
  if (profileId === "undefined") {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  await Promise.all([
    prefetchSSRData(
      ["profile", profileId],
      `/auth/users/${profileId}/`,
      queryClient
    ),
    prefetchSSRData(
      ["stats", profileId],
      `/auth/users/${profileId}/stats/`,
      queryClient
    ),
    prefetchSSRData(
      ["user_quizzes", profileId],
      `/quiz/${profileId}/competitions/`,
      queryClient
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
