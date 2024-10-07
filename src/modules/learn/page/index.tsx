import { ColorFullText } from "@/components/ColorFullText";
import { ArticleCard } from "@/modules/quiz/components/ArticleCard";
import { Container, Stack, Text, VStack } from "@chakra-ui/react";

// header?: {
//     img: string;
//     title: string;
//     CTAText: string;
//     CTAAction: () => void;
//   };
//   banner: string;
//   link: string;
//   linkText: string;
//   articleTitle: string;
//   content: string;
// }

export const Learn = () => {
  const Articles = [
    {
      articleTitle: "salam",
      content:
        "asdjkhasjdhas dasidh ioasdh ioasdh ioasdhioashdioashdioashdioash dioashd asdhas sa dioashd asiodh ioasdh aiosdh asidhioasdh asidhiasofhcjxzcvb",
      banner: "",
      link: "www.google.com",
      linkText: "google",
    },
    {
      articleTitle: "salam",
      content:
        "asdjkhasjdhas dasidh ioasdh ioasdh ioasdhioashdioashdioashdioash dioashd asdhas sa dioashd asiodh ioasdh aiosdh asidhioasdh asidhiasofhcjxzcvb",
      banner: "",
      link: "www.google.com",
      linkText: "google",
    },
    {
      articleTitle: "salam",
      content:
        "asdjkhasjdhas dasidh ioasdh ioasdh ioasdhioashdioashdioashdioash dioashd asdhas sa dioashd asiodh ioasdh aiosdh asidhioasdh asidhiasofhcjxzcvb",
      banner: "",
      link: "www.google.com",
      linkText: "google",
    },
  ];
  return (
    <VStack
      overflow="hidden"
      position="relative"
      justifyContent="center"
      width="full"
    >
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

      <VStack
        w="full"
        // bg="green"
        h="600px"
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
        position="relative"
        zIndex={1}
      >
        {Articles.map((article) => (
          <ArticleCard
            articleTitle={article.articleTitle}
            banner={article.banner}
            content={article.banner}
            link={article.link}
            linkText={article.linkText}
          />
        ))}
        <ArticleCard
          articleTitle="salam"
          content={`asdjkhasjdhas dasidh ioasdh ioasdh ioasdhioashdioashdioashdioash
          dioashd asdhas sa dioashd asiodh ioasdh aiosdh asidhioasdh
          asidhiasofhcjxzcvb`}
          banner=""
          link="www.google.com"
          linkText="google"
        />
      </VStack>
    </VStack>
  );
};
