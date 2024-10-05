import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE, INFO_CARD_STATE } from "@/types";
import { VStack } from "@chakra-ui/react";
import { TopNavbar } from "@/components/TopNavbar";
import { useMemo, useState } from "react";
import { InfoCard } from "../components/InfoCard";

export const Home = () => {
  const [homeState, setHomeState] = useState(INFO_CARD_STATE.join);

  const infoCard = useMemo(() => {
    return {
      [INFO_CARD_STATE.welcome]: <InfoCard state={INFO_CARD_STATE.welcome} />,
      [INFO_CARD_STATE.join]: (
        <>
          <InfoCard state={INFO_CARD_STATE.join} />
          <QuizCard state={CARD_STATE.join} colored />
        </>
      ),
      [INFO_CARD_STATE.lobby]: (
        <>
          <InfoCard state={INFO_CARD_STATE.lobby} />
          <QuizCard state={CARD_STATE.lobby} colored />
        </>
      ),
      [INFO_CARD_STATE.resource]: (
        <>
          <InfoCard state={INFO_CARD_STATE.resource} />
          <QuizCard state={CARD_STATE.resource} colored />
        </>
      ),
      [INFO_CARD_STATE.watch]: (
        <>
          <InfoCard state={INFO_CARD_STATE.watch} />
          <QuizCard state={CARD_STATE.watch} colored />
        </>
      ),
    };
  }, []);

  return (
    <VStack h="full" w="full" gap="16px">
      <TopNavbar />
      {infoCard[homeState]}
    </VStack>
  );
};
