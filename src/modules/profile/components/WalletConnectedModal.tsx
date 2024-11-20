import { BottomModal } from "@/components/BottomModal";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const WalletConnectedModal = ({
  isOpen,
  onClose,
}: UseDisclosureProps) => {
  const unclaimedRewards = true;
  return (
    <BottomModal title="Wallet Connected" isOpen={isOpen} onClose={onClose}>
      <VStack w="full" gap="24px">
        <VStack
          boxSize="80px"
          bg="glassBackground"
          borderRadius="50px"
          border="solid 1px"
          borderColor="green.400"
          position="relative"
          justifyContent="center"
        >
          <Image
            alt="metamask fox"
            src="/assets/images/profile/MetaMask.svg"
            width={44}
            height={44}
          />
          <Badge
            variant="green"
            size="sm"
            position="absolute"
            bottom={0}
            right={0}
          >
            <CheckIcon />
          </Badge>
        </VStack>
        <VStack gap="8px" w="full">
          <Text color="gray.40" fontSize="lg" fontWeight={800}>
            Your wallet is connected
          </Text>
          <Text
            color="gray.80"
            fontSize="sm"
            fontWeight={600}
            textAlign="center"
          >
            {unclaimedRewards
              ? "You have rewards waiting to be claimed from your previous quizzes!"
              : "You're all set to join quizzes and earn rewards."}
          </Text>
        </VStack>
        <Button size="md" w="full">
          {unclaimedRewards ? "Claim All Rewards" : "Explore Quizzes"}
        </Button>
      </VStack>
    </BottomModal>
  );
};
