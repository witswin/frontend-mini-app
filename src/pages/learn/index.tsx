import { Learn } from "@/modules/learn/page";
import { prefetchSSRData } from "@/utils";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const Index = () => {
  return <Learn />;
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
  await prefetchSSRData(["resources"], `/quiz/resources/`, queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
