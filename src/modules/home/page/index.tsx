import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE, INFO_CARD_STATE } from "@/types";
import { Button, VStack } from "@chakra-ui/react";
import { HomeCard } from "../components/HomeCard";

export const Home = () => {
  return (
    <VStack>
      <HomeCard state={INFO_CARD_STATE.resource} />

      <QuizCard state={CARD_STATE.join} colored />
    </VStack>
  );
};
