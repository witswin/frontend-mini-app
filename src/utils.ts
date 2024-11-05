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

export function getUniqueRandomNumbers(exclude: number) {
  const numbers = [0, 1, 2, 3].filter((num) => num !== exclude);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers.slice(0, 2);
}

export const textTruncator = (text: string) => {
  const startText = text.substring(0, 4);
  const endText = text.substring(text.length - 4);

  if (text.length > 8) {
    return `${startText}...${endText}`;
  }
  return text;
};