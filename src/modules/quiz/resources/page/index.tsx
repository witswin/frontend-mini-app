import { Text, VStack } from "@chakra-ui/react";
import { ArticleCard } from "../../components/ArticleCard";
import { ColorFullText } from "@/components/ColorFullText";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { quizType } from "@/globalTypes";
import { axiosClient } from "@/configs/axios";
import { useMemo } from "react";

export const Resources = () => {
  const { query, push } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });

  const resources = useMemo(() => data?.resources, [data]);

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
        {resources?.map((article) => (
          <ArticleCard
            key={article.id}
            articleTitle={article.title}
            banner={article.image}
            content={article.content}
            link={article.link}
            linkText={article.linkText}
            header={{
              img: data.image,
              CTAText: "Enter Quiz",
              title: data.title,
              CTAAction: () => {
                push(`/quiz/${article.competition}`);
              },
            }}
          />
        ))}
      </VStack>
    </VStack>
  );
};
