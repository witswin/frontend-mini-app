import { BottomModal } from "@/components/BottomModal";
import {
  Box,
  HStack,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRightUp } from "solar-icon-set";

interface RewardProps {
  count: number;
  token: string;
  chain: string;
  link: string;
}

const Reward = ({ count, token, chain, link }: RewardProps) => {
  return (
    <HStack w="full" justifyContent="space-between">
      <HStack gap="8px">
        <Box boxSize="28px" borderRadius="50px" bg="yellow" />

        <HStack gap="4px">
          <Text fontSize="lg" fontWeight={600} color="gray.0">
            {count}
          </Text>
          <Text
            fontSize="sm"
            fontWeight={600}
            color="gray.40"
          >{`${token} on ${chain}`}</Text>
        </HStack>
      </HStack>

      <HStack gap="2px" as={Link} href={link}>
        <Text
          fontSize="sm"
          fontWeight={600}
          color="gray.20"
          textDecoration="underline"
        >
          Tx Info
        </Text>
        <ArrowRightUp color="gray.20" size={16} iconStyle="Linear" />
      </HStack>
    </HStack>
  );
};

export const RewardsClaimedModal = ({
  isOpen,
  onClose,
}: UseDisclosureProps) => {
  return (
    <BottomModal
      title="All Rewards Claimed!"
      justifyContent="center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <VStack w="full" gap="24px">
        <Image
          alt="coin to wallet"
          src={"/assets/images/profile/CoinToWallet.svg"}
          width={190}
          height={145}
        />
        <Text color="gray.40" fontWeight={800} fontSize="lg">
          {"You've successfully claimed your rewards"}
        </Text>

        <VStack
          borderRadius="8px"
          bg="glassBackground"
          p="12px"
          gap="16px"
          w="full"
        >
          <Reward count={25} chain="Polygon" token="USDC" link="" />
        </VStack>
      </VStack>
    </BottomModal>
  );
};
