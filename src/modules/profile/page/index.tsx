import { VStack } from "@chakra-ui/react";
import React from "react";
import { Stat } from "../components/Stat";

export const Profile = () => {
  return (
    <VStack w="full" h="full" gap="16px" p="16px">
      <Stat rank={1} quizzes={28} winRate={2} />
    </VStack>
  );
};
