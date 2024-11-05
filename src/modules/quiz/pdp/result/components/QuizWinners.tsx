import { VStack } from "@chakra-ui/react";
import React from "react";
import { WinnerCard } from "./WinnerCard";

export const winnerUsers = [
  {
    id: 0,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
    isCurrentPlayerInWinners: true,
  },
  {
    id: 1,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 2,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 3,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 4,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 5,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 6,
    userId: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
];

export const QuizWinners = () => {
  return (
    <VStack w="full" gap={{ base: "8px", sm: "16px" }} pb="128px">
      {winnerUsers.map((user) => (
        <WinnerCard
          key={user.id}
          userId={user.userId}
          publicKey={user.publicKey}
        />
      ))}
    </VStack>
  );
};
