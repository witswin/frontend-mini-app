import { ColorFullText } from "@/components/ColorFullText";
import { axiosClient } from "@/configs/axios";
import { resource } from "@/globalTypes";
import { ArticleCard } from "@/modules/quiz/components/ArticleCard";
import { Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const Learn = () => {
  const { data } = useQuery<resource[]>({
    queryKey: ["resources"],
    queryFn: async () =>
      await axiosClient.get(`/quiz/resources/`).then((res) => res.data),
  });

  console.log({ data });

  const router = useRouter();

  return (
    <VStack width="full" mb="8px">
      <VStack w="full" justify="center">
        <ColorFullText textContent="Learn Space" fontSize="5xl" />
        <Text
          fontWeight="600"
          color="gray.60"
          fontSize="md"
          textAlign="center"
          mx="auto"
          mt="4px"
          mb="24px"
        >
          Reading the resources increases your chances of winning
        </Text>
      </VStack>

      <VStack w="full" gap="16px" p="2px">
        {data
          ?.filter((article) => article.isActive)
          .map((article) => (
            <ArticleCard
              key={article.id}
              articleTitle={article.title}
              banner={article.image}
              content={article.content}
              link={""}
              linkText={""}
              header={{
                img: article.competition.image,
                CTAText: "Enter Quiz",
                title: article.competition.title,
                CTAAction: () => {
                  router.push(`/quiz/${article.competition.id}`);
                },
              }}
            />
          ))}
      </VStack>
    </VStack>
  );
};
