import { VStack } from "@chakra-ui/react";
import React from "react";
import { ResultBottomNavbar } from "../components/ResultBottomNavbar";
import { PrizeCard } from "../components/PrizeCard";
import { QuizWinners } from "../components/QuizWinners";

export const Result = () => {
  const isSpectator = false;
  return (
    <VStack flexDir="column" w="full" gap="16px" h="full" position="relative">
      <VStack w="full" h="full">
        {!isSpectator && <PrizeCard prizeCount={200} />}
        <QuizWinners isSpectator={isSpectator} />
      </VStack>
      <ResultBottomNavbar />
    </VStack>
  );
};
