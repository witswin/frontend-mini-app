import { QuizCard } from "@/components/QuizCard";
import { CARD_STATE, INFO_CARD_STATE } from "@/types";
import { Badge, Box, Button, Text, VStack } from "@chakra-ui/react";
import { TopNavbar } from "@/components/TopNavbar";
import { useMemo } from "react";
import { InfoCard } from "../components/InfoCard";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/configs/axios";
import { useGetHomeCardState } from "../hooks";
import { BottomModal } from "@/components/BottomModal";

export const Home = () => {
  const { data: closeCompetition } = useQuery({
    queryKey: ["closetCompetition"],
    queryFn: async () =>
      await axiosClient
        .get("/quiz/competitions/latest")
        .then((res) => res.data),
  });

  const cardState = useGetHomeCardState(closeCompetition);

  const infoCard = useMemo(() => {
    return {
      [INFO_CARD_STATE.welcome]: <InfoCard state={INFO_CARD_STATE.welcome} />,
      [INFO_CARD_STATE.join]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.join} />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.join} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.lobby]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.lobby} />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.lobby} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.resource]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.resource} />
          <QuizCard
            quiz={closeCompetition}
            state={CARD_STATE.resource}
            colored
          />
        </VStack>
      ),
      [INFO_CARD_STATE.watch]: (
        <VStack width="full" h="full" gap="16px" justifyContent="flex-start">
          <InfoCard state={INFO_CARD_STATE.watch} />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.watch} colored />
        </VStack>
      ),
    };
  }, []);

  return (
    <VStack height="full" w="full" rowGap="16px">
      <TopNavbar />
      {/* <VStack mt="12px" w="full" height="full">
        {infoCard[cardState]}
      </VStack> */}
      <Button variant="outline">hello</Button>
      <Button variant="gray">hello</Button>
      <Box bg={"greenyellow"}></Box>
      {/* <BottomModal isOpen={true}>
        <VStack h="200px">
          <Text>this is a test modal</Text>
        </VStack>
        <Button variant="outline" size={"lg"}>
          hello
        </Button>
      </BottomModal> */}
    </VStack>
  );
};
