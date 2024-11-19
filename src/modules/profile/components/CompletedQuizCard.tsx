import { Card } from "@/components/Card";
import {
  Badge,
  Button,
  HStack,
  Img,
  Spinner,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ConfettiMinimalistic } from "solar-icon-set";
import USDC_img from "@/assets/tokens/USDC.svg";
import Image from "next/image";

export const CompletedQuizCard = ({
  amountWon,
  title,
  date,
  imgAddress,
  isWinner,
  isSelfUser,
  user_competition_id,
  isClaimTriggered,
  txHash,
}: {
  amountWon: number;
  title: string;
  date: Date | number;
  imgAddress: string;
  isWinner: boolean;
  isSelfUser: boolean;
  user_competition_id: number;
  isClaimTriggered: boolean;
  txHash: string;
}) => {
  const [isLarge] = useMediaQuery("(min-width: 480px)");
  // token and chain are hard coded for this phase, for next phases of the project they are likely to change
  const token = "USDC";
  const chain = "Arbitrum";
  const showClaim = isSelfUser && isWinner;
  const [claimRewardLoading, setClaimRewardLoading] =
    useState(isClaimTriggered);

  const dateString = new Date(date)
    .toLocaleString("default", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
    .split(",");

  return (
    <Card position="relative">
      {isWinner && (
        <Badge
          variant="primary"
          size="md"
          display="flex"
          alignItems="center"
          position="absolute"
          top="16px"
          right="16px"
        >
          <ConfettiMinimalistic iconStyle="Bold" size={16} color="gray.0" />
        </Badge>
      )}

      <Img rounded="full" boxSize="64px" src={imgAddress} />

      <VStack gap="4px">
        <Text color="gray.0" fontSize="md" fontWeight="600" textAlign="center">
          {title}
        </Text>
        <Text color="gray.60" fontSize="sm" fontWeight="500" textAlign="center">
          {dateString[0] + " . " + dateString[1]}
        </Text>
      </VStack>

      <HStack
        w="full"
        bg="glassBackground"
        borderRadius="8px"
        p="8px"
        pl="12px"
        justifyContent="space-between"
      >
        <HStack gap="8px" overflow="auto">
          <Image src={USDC_img} alt="USDC" width={28} height={28} />

          <HStack gap="4px">
            <HStack maxW="80px" overflow="auto">
              <Text fontSize="lg" fontWeight={600} color="gray.0">
                {amountWon}
              </Text>
            </HStack>
            <Text
              fontSize="sm"
              fontWeight={600}
              color="gray.40"
            >{`${token} on ${chain}`}</Text>
          </HStack>
        </HStack>
        {claimRewardLoading ? (
          <Spinner size="md" color="gray.40" />
        ) : (
          isLarge &&
          showClaim && (
            <Button
              variant="outline"
              size="mini"
              onClick={() => {}}
              isDisabled={!!txHash}
            >
              {!!txHash ? "Claimed" : "Claim"}
            </Button>
          )
        )}
      </HStack>

      {!isLarge && showClaim && (
        <Button variant="outline" size="mini" w="full" isDisabled={!!txHash}>
          {!!txHash ? "Claimed" : "Claim"}
        </Button>
      )}
    </Card>
  );
};
