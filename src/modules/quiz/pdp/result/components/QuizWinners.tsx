import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { WinnerCard } from "./WinnerCard";

const winnerUsers = [
  {
    id: 0,
    userId: "Ali",
    publicKey: "0x1231....123123",
    isCurrentPlayerInWinners: true,
  },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
];

export const QuizWinners = ({ isSpectator }: { isSpectator: boolean }) => {
  const winnersCount = 10;

  return (
    <VStack
      h={isSpectator ? "698px" : "320px"}
      w="full"
      p="16px"
      bg="glassBackground"
      borderRadius="16px"
      gap="16px"
      overflow="hidden"
    >
      <Text fontSize="2xl" fontWeight={500} color="gray.0">
        Quiz Winners
      </Text>
      <Text
        fontSize="sm"
        fontWeight={500}
        color="gray.60"
      >{`Total prize had divided between ${
        !!winnersCount && winnersCount
      } winners.`}</Text>

      <VStack w="full" overflow="auto" p="1px" pr="8px">
        {winnerUsers.map((user) => (
          <WinnerCard
            key={user.id}
            isCurrentPlayerInWinners={!!user.isCurrentPlayerInWinners}
            userId={user.userId}
            publicKey={user.publicKey}
          />
        ))}
      </VStack>
    </VStack>
  );
};
