import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import SpectatorImg from "@/assets/rest-spectator.svg";
import PlayerImg from "@/assets/rest-player.svg";
import { Card } from "@/components/Card";
import { useQuestionData } from "../hooks";

interface RestProps {
  seconds: number;
  isSpectator: boolean;
}

export const Rest = ({ seconds, isSpectator }: RestProps) => {
  const [countDown, setCountDown] = useState(seconds);

  const { quizStats } = useQuestionData();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev - 1 >= 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card minH="554px" justifyContent="center">
      <VStack w="full" h="full" justifyContent="center" gap="24px" mb="20px">
        <Image src={isSpectator ? SpectatorImg : PlayerImg} alt="" />

        <VStack>
          {!isSpectator && (
            <Text color="green.400" fontSize="2xl" fontWeight={700}>
              Great job! Yep.
            </Text>
          )}
          <HStack>
            <Text
              fontSize="sm"
              color="gray.0"
              fontWeight={500}
              textDecoration="underline"
            >
              {quizStats?.previousRoundLosses}
            </Text>
            <Text fontSize="sm" color="gray.60" fontWeight={500}>
              people lost last round.
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <Text
        position="absolute"
        bottom="12px"
        fontSize="sm"
        color="gray.80"
        fontWeight={700}
      >{`Next Questions in ${countDown} seconds... `}</Text>
    </Card>
  );
};
