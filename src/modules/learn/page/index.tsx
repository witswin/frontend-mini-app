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
    },
    {
      id: 1,
      articleTitle: "salam",
      content: "asdjkhasjdhas dasidh ioasdh ioasdh ",
      banner: "",
      link: "www.google.com",
      linkText: "google",
    },
    {
      id: 2,
      articleTitle: "salam",
      content: "asdj",
      banner: "",
      link: "www.google.com",
      linkText: "google",
    },
  ];
  return (
    <VStack
      overflow="hidden"
      position="relative"
      justifyContent="start"
      width="full"
      h="calc(100vh - 106px)"
      pb="0"
      display="flex"
      flexDir="column"
    >
      <VStack w="full" h="132px" justify="center">
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

      <VStack
        w="full"
        overflowX="hidden"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        gap="16px"
        p="2px"
        zIndex={1}
      >
        {Articles.map((article) => (
          <ArticleCard
            key={article.id}
            articleTitle={article.articleTitle}
            banner={article.banner}
            content={article.content}
            link={article.link}
            linkText={article.linkText}
          />
        ))}
      </VStack>
    </VStack>
  );
};
