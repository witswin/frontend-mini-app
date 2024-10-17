import { Box, HStack, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import HeaderBg from "@/assets/QuestionHeaderBg.svg";
import Image from "next/image";
import { useState } from "react";
import { ColorFullText } from "@/components/ColorFullText";
import Prize from "@/assets/Prize.png";

export const TopNavbar = () => {
  const [isLarge] = useMediaQuery("(min-width: 500px)");
  const questionCount = 10;
  const [
    activeQuestion,
    //  setActiveQuestion
  ] = useState(4);
  const participantCount = 150;
  const [
    survivorsCount,
    // , setSurvivorsCount
  ] = useState(100);
  const [
    prize,
    // , setPrize
  ] = useState("1200.00");

  return (
    <HStack
      h={isLarge ? "120px" : "90px"}
      w="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt="-20px"
      px={isLarge ? "16px" : "0"}
    >
      <Box position="absolute" zIndex="base" width="100%" height="100%">
        <Image
          src={HeaderBg}
          alt="navbar background illustration."
          layout="responsive"
        />
      </Box>

      <HStack
        zIndex="docked"
        w="full"
        justifyContent="space-between"
        px="12px"
        pt="4px"
      >
        <VStack alignItems="start">
          <Text color="gray.40" fontSize="sm" fontWeight={700}>
            Question
          </Text>
          <HStack gap="4px">
            <Text color="gray.0" fontSize="lg" fontWeight={700}>
              {activeQuestion}
            </Text>
            <Text color="gray.80" fontSize="xs" fontWeight="bold">
              / {questionCount}
            </Text>
          </HStack>
        </VStack>

        <HStack gap="6px" alignItems="center" mt="30px">
          <Image src={Prize} alt="Prize" />

          <ColorFullText fontSize="4xl" fontWeight={700} textContent={prize} />
          <ColorFullText fontSize="xs" fontWeight={700} textContent={"USDT"} />
        </HStack>

        <VStack alignItems="end">
          <Text color="gray.40" fontSize="sm" fontWeight={700}>
            Survivors
          </Text>
          <HStack gap="4px">
            <Text color="gray.0" fontSize="lg" fontWeight={700}>
              {survivorsCount}
            </Text>
            <Text color="gray.80" fontSize="xs" fontWeight="bold">
              / {participantCount}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};
