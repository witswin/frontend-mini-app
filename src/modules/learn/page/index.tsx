import { ColorFullText } from "@/components/ColorFullText";
import { ArticleCard } from "@/modules/quiz/components/ArticleCard";
import { Text, VStack } from "@chakra-ui/react";

export const Learn = () => {
  const Articles = [
    {
      id: 0,
      articleTitle: "salam",
      content: "asdjkhasjdhas dasidh",
      banner: "",
      link: "www.google.com",
      linkText: "google",
      header: {
        title: "Optimism Quiz Tap",
        img: "",
        CTAText: "Enter Quiz",
        CTAAction: () => {},
      },
    },
    {
      id: 1,
      articleTitle: "salam",
      content: "asdjkhasjdhas dasidh",
      banner: "",
      link: "www.google.com",
      linkText: "google",
      header: {
        title: "Optimism Quiz Tap",
        img: "",
        CTAText: "Enter Quiz",
        CTAAction: () => {},
      },
    },
    {
      id: 2,
      articleTitle: "salam",
      content: "asdjkhasjdhas dasidh",
      banner: "",
      link: "www.google.com",
      linkText: "google",
      header: {
        title: "Optimism Quiz Tap",
        img: "",
        CTAText: "Enter Quiz",
        CTAAction: () => {},
      },
    },
  ];
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
        {Articles.map((article) => (
          <ArticleCard
            key={article.id}
            articleTitle={article.articleTitle}
            banner={article.banner}
            content={article.content}
            link={article.link}
            linkText={article.linkText}
            header={article?.header}
          />
        ))}
      </VStack>
    </VStack>
  );
};
