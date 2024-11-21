import { VStack } from "@chakra-ui/react";
import React from "react";
import { WinnerCard } from "./WinnerCard";
import { useAuth } from "@/hooks/useAuthorization";
import { quizFinishedData } from "@/globalTypes";

interface QuizWinnersProps {
  finishedData: quizFinishedData[];
}
export const QuizWinners = ({ finishedData }: QuizWinnersProps) => {
  const authInfo = useAuth();
  return (
    <VStack w="full" gap={{ base: "8px", sm: "16px" }} pb="128px">
      {finishedData?.map((user) => (
        <WinnerCard
          userId={user?.pk}
          key={user?.pk}
          name={user?.firstName}
          walletAddress={user?.wallets?.[0]?.walletAddress}
          isSelfUser={user?.pk === authInfo?.pk}
          username={user?.username}
        />
      ))}
    </VStack>
  );
};
