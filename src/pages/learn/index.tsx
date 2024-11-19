import { Learn } from "@/modules/learn/page";
import { prefetchSSRData } from "@/utils";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const Index = () => {
  return <Learn />;
};

export default Index;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await prefetchSSRData(["resources"], `/quiz/resources/`, queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
