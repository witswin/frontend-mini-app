import { VStack } from "@chakra-ui/react";
import React from "react";
import { WinnerCard } from "./WinnerCard";

export const winnerUsers = [
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
  { id: 0, userId: "Ali", publicKey: "0x1231....123123" },
];

export const QuizWinners = () => {
  return (
    <VStack w="full" gap={{ base: "8px", sm: "16px" }} pb="128px">
      {winnerUsers.map((user) => (
        <WinnerCard
          key={user.id}
          isCurrentPlayerInWinners={!!user.isCurrentPlayerInWinners}
          userId={user.userId}
          publicKey={user.publicKey}
        />
      ))}
    </VStack>
  );
};
