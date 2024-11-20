import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CheckCircle, Notes, Ranking } from "solar-icon-set";
import { profileStats } from "@/globalTypes";

interface Props {
  userStats: profileStats;
}

export const Stat = ({ userStats }: Props) => {
  const { rank, quizCount, winrate } = userStats;

  return (
    <Card>
      <Flex w="full" h="full" gap="8px" p="0px">
        <VStack gap="8px" flex={1}>
          <VStack gap="2px">
            <Text
              textAlign="center"
              fontSize="2xl"
              fontWeight={700}
              bgGradient="var(--chakra-colors-primaryRadial)"
              bgClip="text"
            >
              {rank}
            </Text>
            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.40"
              fontWeight={800}
            >
              Rank
            </Text>
          </VStack>
          <Ranking
            color="var(--chakra-colors-blue)"
            size={32}
            iconStyle="BoldDuotone"
          />
        </VStack>

        <Divider orientation="vertical" borderColor="gray.400" />

        <VStack gap="8px" flex={1}>
          <VStack gap="2px">
            <Text
              textAlign="center"
              fontSize="2xl"
              fontWeight={700}
              bgGradient="var(--chakra-colors-primaryRadial)"
              bgClip="text"
            >
              {quizCount}
            </Text>
            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.40"
              fontWeight={800}
            >
              Quizzes Played
            </Text>
          </VStack>
          <Notes
            color="var(--chakra-colors-blue)"
            size={32}
            iconStyle="BoldDuotone"
          />
        </VStack>

        <Divider orientation="vertical" borderColor="gray.400" />

        <VStack gap="8px" flex={1}>
          <VStack gap="2px">
            <Text
              textAlign="center"
              fontSize="2xl"
              fontWeight={700}
              bgGradient="var(--chakra-colors-primaryRadial)"
              bgClip="text"
            >
              {`${winrate}%`}
            </Text>
            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.40"
              fontWeight={800}
            >
              Win Rate
            </Text>
          </VStack>
          <CheckCircle
            color="var(--chakra-colors-blue)"
            size={32}
            iconStyle="BoldDuotone"
          />
        </VStack>
      </Flex>
    </Card>
  );
};
