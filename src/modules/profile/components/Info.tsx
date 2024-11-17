import React from "react";
import { Card } from "./Card";
import { Badge, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { SettingsMinimalistic, WalletMoney } from "solar-icon-set";
import Link from "next/link";
import Image from "next/image";
import { textTruncator } from "@/utils";

interface InfoProps {
  userName: string;
  telegramId: string;
  walletAddress: string;
  imgAddress: string;
  isOwnProfile: boolean;
  neuronsCount: number;
}

interface Props {
  userInfo: InfoProps;
}

export const Info = ({ userInfo }: Props) => {
  const {
    userName,
    telegramId,
    walletAddress,
    imgAddress,
    isOwnProfile,
    neuronsCount,
  } = userInfo;
  return (
    <Card>
      <Image
        alt="avatar"
        src={imgAddress || "/assets/images/profile/Avatar.svg"}
        width={88}
        height={88}
      />
      <VStack gap="0">
        <Text fontSize="4xl" fontWeight={800} color="gray.0">
          {userName}
        </Text>
        {isOwnProfile && (
          <Text fontSize="sm" fontWeight={600} color="gray.0">
            {telegramId}
          </Text>
        )}
      </VStack>

      <HStack bg="transparent">
        <Text>{neuronsCount}</Text>
        <Text>Neurons</Text>
      </HStack>

      {/* social Links */}
      {!!walletAddress && (
        <HStack>
          <Badge variant="glass" size="md">
            <Text fontSize="md" fontWeight={600} color="gray.0" mx="4px">
              {textTruncator(walletAddress)}
            </Text>
          </Badge>
        </HStack>
      )}

      {isOwnProfile && (
        <Flex
          bg="glassBackground"
          borderRadius="8px"
          p="8px"
          gap="8px"
          h="54px"
          w="full"
        >
          <HStack
            gap="6px"
            justifyContent="center"
            alignItems="center"
            as={Link}
            href="/setting"
            flex={1}
          >
            <SettingsMinimalistic color="gray.20" size={20} iconStyle="Bold" />
            <Text fontSize="md" fontWeight={600} color="gray.20">
              Account Setting
            </Text>
          </HStack>
          <Divider orientation="vertical" />
          <HStack
            flex={1}
            gap="6px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={() => {}}
          >
            <WalletMoney color="gray.20" size={20} iconStyle="Bold" />
            <Text fontSize="md" fontWeight={600} color="gray.20">
              Connect Wallet
            </Text>
          </HStack>
        </Flex>
      )}
    </Card>
  );
};
