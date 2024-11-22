import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import {
  Badge,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Link as ChakraLink,
  Image,
  useToast,
  useClipboard,
} from '@chakra-ui/react';

import { SettingsMinimalistic, WalletMoney } from 'solar-icon-set';
import Link from 'next/link';
import { handleApiError, textTruncator } from '@/utils';
import { profileInfo } from '@/globalTypes';
import { useAuth } from '@/hooks/useAuthorization';
import { getGrade, GradeBadge } from './Grading';
import { BrandDiscord, BrandFarcaster, BrandTelegram, BrandX } from './icons';
import { useAccount, useSignMessage } from 'wagmi';
import { axiosClient } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Integrations, UserConnection } from '@/modules/settings/types';
import { useWalletConnection } from '@/hooks/useWalletConnection';

interface Props {
  userInfo: profileInfo;
}

export const Info = ({ userInfo }: Props) => {
  const ownUser = useAuth();

  const isOwnProfile = ownUser?.pk ? userInfo.pk === ownUser.pk : false;
  // const isOwnProfile = userInfo.pk === ownUser.pk;
  const grade = getGrade(userInfo?.neuron);

  const { address } = useAccount();
  const { connect, disconnect } = useWalletConnection();

  const [signMessageLoading, setSignMessageLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const integrationsFetch = useQuery({
    initialData: undefined,
    refetchOnMount: true,
    queryKey: ['fetch-integrations', userInfo.pk],
    queryFn: () =>
      axiosClient.get(`/auth/users/${userInfo.pk}/connections/`).then((res) => {
        const data = res.data as UserConnection[];

        const transformedData = data.reduce((prev, curr) => {
          const name = Object.keys(curr)[0];

          prev[name] = curr[name];
          return prev;
        }, {} as UserConnection);

        return transformedData as Integrations;
      }),
  });

  const messageFetch = useQuery({
    initialData: undefined,
    queryKey: ['message-sign', address],
    enabled: !!address,
    queryFn: () =>
      axiosClient
        .post('/auth/create-message/', {
          address,
        })
        .then(({ data }) => {
          return { message: data.message, nonce: data.nonce };
        }),
  });

  useEffect(() => {
    // if (window.Telegram.WebApp.initData) return
    if (!address || !signMessageLoading) return;

    if (
      ownUser.wallets.find(
        (item) => item.walletAddress?.toLowerCase() === address?.toLowerCase(),
      )
    ) {
      setSignMessageLoading(false);
      return;
    }

    const message = messageFetch.data;

    if (messageFetch.data?.message) {
      signMessageAsync({
        message: message.message,
        account: address,
      })
        .then((res) => {
          const hasWallet = !!ownUser.wallets.length;

          axiosClient.post(
            hasWallet ? '/auth/change-wallets/' : '/auth/add-wallets/',
            {
              address: address,
              signature: res,
              nonce: message.nonce,
            },
          );
        })
        .catch((err) => {
          handleApiError(err, toast);
          console.warn(err);
        })
        .finally(() => {});
    }
  }, [
    address,
    messageFetch.data,
    ownUser,
    signMessageAsync,
    signMessageLoading,
    toast,
  ]);

  const onConnectWallet = () => {
    disconnect();
    setSignMessageLoading(true);

    setTimeout(() => {
      connect();
    }, 0);
  };

  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  useEffect(() => {
    if (!value) {
      setValue(userInfo?.wallets?.[0]?.walletAddress);
    }
  }, [userInfo?.wallets]);

  return (
    <Card>
      <VStack position="relative" boxSize="102px" justifyContent="center">
        <CircularProgress
          value={40}
          top={0}
          left={0}
          size="102px"
          thickness="2px"
          color={grade?.color}
          trackColor="gray.600"
          position="absolute"
          transform="rotate(225deg)"
        />
        <Image
          borderRadius="full"
          alt="avatar"
          src={userInfo?.image || '/assets/images/profile/Avatar.svg'}
          boxSize={'80px'}
          fit="cover"
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
          {grade?.icon}
        </VStack>
      </VStack>
      <VStack gap="0">
        <Text fontSize="4xl" fontWeight={800} color="gray.0">
          {userInfo.username}
        </Text>
        {/* {isOwnProfile && (
          <Text fontSize="sm" fontWeight={600} color="gray.0">
            {userInfo?.first_name + userInfo?.last_name ||
              `user_${userInfo?.pk}`}
          </Text>
        )} */}
      </VStack>

      <GradeBadge neuronCount={userInfo.neuron} grade={grade} />

      {/* social Links gotta add logic for showing each link*/}
      <HStack w="full" justifyContent="center" wrap="wrap" spacing="16px">
        {/* <Badge
          variant="glass"
          size="md"
          display="flex"
          justifyContent="center"
          as={ChakraLink}
          isExternal
          href={""}
        >
          <VStack justifyContent="center">
            <BrandInstagram />
          </VStack>
        </Badge> */}
        {!!integrationsFetch.data?.Discord && (
          <Badge
            variant="glass"
            size="md"
            display="flex"
            justifyContent="center"
            as={ChakraLink}
            isExternal
            href={`https://discord.gg/${integrationsFetch.data?.Discord.username}`}
          >
            <VStack justifyContent="center">
              <BrandDiscord />
            </VStack>
          </Badge>
        )}
        {!!integrationsFetch.data?.Farcaster && (
          <Badge
            variant="glass"
            size="md"
            display="flex"
            justifyContent="center"
            as={ChakraLink}
            isExternal
            href={''}
          >
            <VStack justifyContent="center">
              <BrandFarcaster />
            </VStack>
          </Badge>
        )}
        {!!integrationsFetch.data?.Twitter &&
          !!integrationsFetch.data?.Twitter.isConnected && (
            <Badge
              variant="glass"
              size="md"
              display="flex"
              justifyContent="center"
              as={ChakraLink}
              isExternal
              href={`https://x.com/${integrationsFetch.data?.Twitter.username}`}
            >
              <VStack justifyContent="center">
                <BrandX />
              </VStack>
            </Badge>
          )}
        {!!integrationsFetch.data?.Telegram &&
          !integrationsFetch.data?.Telegram.isPrivate && (
            <Badge
              variant="glass"
              size="md"
              display="flex"
              justifyContent="center"
              as={ChakraLink}
              isExternal
              href={`https://t.me/${integrationsFetch.data?.Telegram.username}`}
            >
              <VStack justifyContent="center">
                <BrandTelegram />
              </VStack>
            </Badge>
          )}
        {!!userInfo?.wallets?.length && (
          <Badge
            onClick={() => {
              onCopy();
            }}
            variant="glass"
            size="md"
          >
            <Text fontSize="md" fontWeight={600} color="gray.0" mx="4px">
              {hasCopied
                ? 'Copied!'
                : textTruncator(userInfo?.wallets?.[0].walletAddress)}
            </Text>
          </Badge>
        )}
      </HStack>

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
            href="/settings"
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
            onClick={onConnectWallet}
          >
            <WalletMoney color="gray.20" size={20} iconStyle="Bold" />
            <Text fontSize="md" fontWeight={600} color="gray.20">
              {userInfo.wallets.length ? 'Change Wallet' : 'Connect Wallet'}
            </Text>
          </HStack>
        </Flex>
      )}
    </Card>
  );
};
