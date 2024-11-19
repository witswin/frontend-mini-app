import React from "react";
import { Card } from "./Card";
import {
  Badge,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SettingsMinimalistic, WalletMoney } from "solar-icon-set";
import Link from "next/link";
import Image from "next/image";
import { textTruncator } from "@/utils";
import { profileInfo } from "@/globalTypes";
import { useAuth } from "@/hooks/useAuthorization";
import { getGrade, GradeBadge } from "./Grading";

interface Props {
  userInfo: profileInfo;
}

export const Info = ({ userInfo }: Props) => {
  const ownUser = useAuth();

  const isOwnProfile = ownUser?.pk ? userInfo.pk === ownUser.pk : false;
  // const isOwnProfile = userInfo.pk === ownUser.pk;
  const grade = getGrade(userInfo.neuron);

  return (
    <Card>
      <VStack position="relative" boxSize="92px" justifyContent="center">
        <CircularProgress
          value={40}
          top={0}
          left={0}
          size="92px"
          thickness="2px" /* Adjust border thickness */
          color={grade.color}
          trackColor="gray.600"
          position="absolute"
          transform="rotate(225deg)"
        />
        <Image
          alt="avatar"
          src={userInfo?.image || "/assets/images/profile/Avatar.svg"}
          width={80}
          height={80}
        />
        <VStack
          boxSize="32px"
          borderRadius="50px"
          bg="gray.600"
          justifyContent="center"
          position="absolute"
          bottom={0}
          left={0}
        >
          {grade.icon}
        </VStack>
      </VStack>
      <VStack gap="0">
        <Text fontSize="4xl" fontWeight={800} color="gray.0">
          {userInfo?.username || `user_${userInfo?.pk}`}
        </Text>
        {/* {isOwnProfile && (
          <Text fontSize="sm" fontWeight={600} color="gray.0">
            {telegramId}
          </Text>
        )} */}
      </VStack>

      <GradeBadge neuronCount={userInfo.neuron} grade={grade} />

      {/* social Links */}
      {!!userInfo?.wallets[0] && (
        <HStack>
          <Badge variant="glass" size="md">
            <Text fontSize="md" fontWeight={600} color="gray.0" mx="4px">
              {textTruncator(userInfo?.wallets[0].walletAddress)}
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
