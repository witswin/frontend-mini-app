import { HStack, Text } from "@chakra-ui/react";

interface QuestionBannerProps {
  content: string;
}
export const QuestionBanner = ({ content }: QuestionBannerProps) => {
  return (
    <HStack
      borderRadius="10px"
      minH="186px"
      boxShadow="0px 0px 0px 0px #6E81EE1F"
      bg="glassBackground"
      width="full"
    >
      <Text
        textAlign="center"
        width="full"
        lineHeight="24px"
        fontSize="3xl"
        color="gray.0"
        fontFamily="kanit"
      >
        {content}
      </Text>
    </HStack>
  );
};
