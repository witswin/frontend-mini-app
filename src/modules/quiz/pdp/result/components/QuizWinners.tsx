import { VStack } from "@chakra-ui/react";
import React from "react";
import { WinnerCard } from "./WinnerCard";
import { useAuth } from "@/hooks/useAuthorization";

export const winnerUsers = [
  {
    id: 0,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 1,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 2,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 3,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 4,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 5,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
  {
    id: 6,
    name: "Ali",
    publicKey: "0xA380074488374295f9344645E9219b8c6060D3C2",
  },
];

export const QuizWinners = () => {
  const authInfo = useAuth();
  return (
    <VStack w="full" gap={{ base: "8px", sm: "16px" }} pb="128px">
      {winnerUsers.map((user) => (
        <WinnerCard
          key={user.id}
          name={user.name}
          publicKey={user.publicKey}
          isSelfUser={user.id === authInfo?.pk}
        />
      ))}
    </VStack>
  );
};
