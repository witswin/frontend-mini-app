import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE } from "@/types";
import { Button, VStack } from "@chakra-ui/react";

export const Home = () => {
  return (
    <VStack>
      <Button variant="outline" size="lg">
        sakdjas
      </Button>
      <QuizCard state={CARD_STATE.join} colored />
    </VStack>
  );
};
