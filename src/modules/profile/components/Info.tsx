import React from "react";
import { Card } from "./Card";
import { Badge, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { SettingsMinimalistic, WalletMoney } from "solar-icon-set";
import Link from "next/link";
import Image from "next/image";
import { textTruncator } from "@/utils";
import { profileInfo } from "@/globalTypes";

// pk: number;
//   userName: string;
//   wallets: {
//     walletAddress: string;
//     createdAt: string;
//   }[];
//   image: string;
//   neuron: number;
interface Props {
  userInfo: profileInfo;
}

export const Info = ({ userInfo }: Props) => {
  console.log(userInfo);

  // const {  image: imgAddress, neuron, pk } = userInfo;
  //
  // const { username = "" } = userInfo;

  // console.log(username);

  const isOwnProfile = true;
  return (
    <Card>
      <Image
        alt="avatar"
        src={userInfo?.image || "/assets/images/profile/Avatar.svg"}
        width={88}
        height={88}
      />
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

      <HStack bg="transparent">
        <Text>{userInfo?.neuron}</Text>
        <Text>Neurons</Text>
      </HStack>

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
