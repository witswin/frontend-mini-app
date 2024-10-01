import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE, INFO_CARD_STATE } from "@/types";
import { VStack } from "@chakra-ui/react";
import { HomeCard } from "../components/HomeCard";
import { TopNavbar } from "@/components/TopNavbar";

export const Home = () => {
  return (
    <VStack h="full" w="full" gap="16px">
      <TopNavbar />
      <HomeCard state={INFO_CARD_STATE.welcome} />

      {/* <QuizCard state={CARD_STATE.join} colored /> */}
    </VStack>
  );
};
