import { QueryClient } from "@tanstack/react-query";
import { axiosClient } from "./configs/axios";

export const prefetchSSRData = async (key: string[], endpoint: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: key,
    queryFn: async () =>
      await axiosClient.get(endpoint).then((res) => res.data),
  });
  return queryClient;
};
