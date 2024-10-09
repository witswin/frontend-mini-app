import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE, INFO_CARD_STATE } from "@/types";
import { VStack } from "@chakra-ui/react";
import { TopNavbar } from "@/components/TopNavbar";
import { useMemo, useState } from "react";
import { InfoCard } from "../components/InfoCard";

export const Home = () => {
  const [
    homeState,
    //setHomeState
  ] = useState(INFO_CARD_STATE.resource);

  const infoCard = useMemo(() => {
    return {
      [INFO_CARD_STATE.welcome]: <InfoCard state={INFO_CARD_STATE.welcome} />,
      [INFO_CARD_STATE.join]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.join} />
          <QuizCard state={CARD_STATE.join} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.lobby]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.lobby} />
          <QuizCard state={CARD_STATE.lobby} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.resource]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.resource} />
          <QuizCard state={CARD_STATE.resource} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.watch]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.watch} />
          <QuizCard state={CARD_STATE.watch} colored />
        </VStack>
      ),
    };
  }, []);

  return (
    <VStack height="full" w="full" rowGap="16px">
      <TopNavbar />
      <VStack mt='12px' w="full" height="full">
        {infoCard[homeState]}
      </VStack>
    </VStack>
  );
};
