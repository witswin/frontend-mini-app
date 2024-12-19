import { VStack } from "@chakra-ui/react";
import { QuizInfo } from "../components/QuizInfo";
import { useNavigateToLobby } from "@/hooks/useNavigateToLobby";

export const Index = () => {
  useNavigateToLobby();
  return (
    <VStack pb="80px" width="full">
      <QuizInfo />
    </VStack>
  );
};
