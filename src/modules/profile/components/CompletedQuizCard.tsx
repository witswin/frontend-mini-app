import { Card } from '@/components/Card';
import {
  Badge,
  Button,
  HStack,
  Img,
  Link,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ArrowRightUp, ConfettiMinimalistic } from 'solar-icon-set';
import USDC_img from '@/assets/tokens/USDC.svg';
import Image from 'next/image';
import { axiosClient } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { userQuiz } from '@/globalTypes';
import { RewardsClaimedModal } from './RewardsClaimedModal';
import { useAuth } from '@/hooks/useAuthorization';
import { WalletModal } from '@/components/WalletModal';
import { Address } from 'viem';

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
  profileId,
  quizId,
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
  profileId: string;
  quizId: number;
}) => {
  const [isLarge] = useMediaQuery('(min-width: 480px)');
  // token and chain are hard coded for this phase, for next phases of the project they are likely to change
  const [isRewardsClaimedOpen, setIsRewardsClaimedOpen] = useState(false);
  const token = 'USDC';
  const chain = 'Arbitrum';
  const showClaim = isSelfUser && isWinner;
  const [claimRewardLoading, setClaimRewardLoading] =
    useState(isClaimTriggered);
  const auth = useAuth();
  const toast = useToast();

  // const isWalletConnected = auth.wallets?.length > 0;

  const [localTxHash, setLocalTxHash] = useState(txHash);

  useEffect(() => {
    setLocalTxHash(txHash);
    // setIsRewardsClaimedOpen(isClaimTriggered);
  }, [txHash, isClaimTriggered]);

  const dateString = new Date(date)
    .toLocaleString('default', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
    .split(',');

  const [pollingEnabled, setPollingEnabled] = useState(false);

  useQuery<userQuiz[]>({
    queryKey: ['user_quizzes', profileId], // Use a unique key for the query
    queryFn: async () =>
      await axiosClient.get(`/quiz/${profileId}/competitions/`).then((res) => {
        if (
          res?.data?.filter(
            (quiz: userQuiz) => quiz.competition.id === quizId,
          )[0].txHash
        ) {
          setPollingEnabled(false);
          setClaimRewardLoading(false);
          setLocalTxHash(
            res?.data?.filter(
              (quiz: userQuiz) => quiz.competition.id === quizId,
            )[0].txHash,
          );
          setIsRewardsClaimedOpen(true);
        }

        return res.data;
      }),
    enabled: pollingEnabled,
    refetchInterval: pollingEnabled ? 10000 : false,
  });

  const triggerClaim = (walletAddress: Address) => {
    if (walletAddress) {
      axiosClient
        .post('/quiz/claim-prize/', { user_competition_id })
        .then(() => {
          setClaimRewardLoading(true);
        })
        .finally(() => {
          setPollingEnabled(true);
        });
    } else {
      toast({
        description: 'Your wallet is not Connected. connect your wallet first.',
        status: 'error',
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {dateString[0] + ' . ' + dateString[1]}
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
              {...(!isLarge && { fontSize: 'xs' })}
            >{`${token} on ${chain}`}</Text>
          </HStack>
        </HStack>
        {isLarge &&
          showClaim &&
          (claimRewardLoading ? (
            <Spinner size="md" color="gray.40" />
          ) : !localTxHash ? (
            <Button
              variant="outline"
              size="mini"
              onClick={() => {
                if (auth?.wallets?.length === 0) {
                  onOpen();
                } else {
                  triggerClaim(auth?.wallets?.[0]?.walletAddress);
                }
              }}
              isDisabled={!!localTxHash}
            >
              Claim
            </Button>
          ) : (
            <HStack
              gap="2px"
              as={Link}
              isExternal
              // href={`https://testnet.bscscan.com/tx/0x${localTxHash}`}
              href={`https://optimistic.etherscan.io/tx/0x${localTxHash}`}
            >
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
          ))}
      </HStack>

      {!isLarge &&
        showClaim &&
        (claimRewardLoading ? (
          <Spinner size="md" color="gray.40" />
        ) : !localTxHash ? (
          <Button
            variant="outline"
            size="mini"
            w="full"
            onClick={() => {
              if (auth?.wallets?.length === 0) {
                onOpen();
              } else {
                triggerClaim(auth?.wallets?.[0]?.walletAddress);
              }
            }}
          >
            Claim
          </Button>
        ) : (
          <HStack
            gap="2px"
            as={Link}
            isExternal
            // href={`https://testnet.bscscan.com/tx/0x${localTxHash}`}
            href={`https://optimistic.etherscan.io/tx/0x${localTxHash}`}
          >
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
        ))}
      <RewardsClaimedModal
        count={Math.round((amountWon + Number.EPSILON) * 10e6) / 10e6}
        link={`https://testnet.bscscan.com/tx/0x${localTxHash}`}
        isOpen={isRewardsClaimedOpen}
        onClose={() => setIsRewardsClaimedOpen(false)}
      />
      <WalletModal
        isOpen={isOpen}
        onClose={onClose}
        callback={(walletAddress: Address) => triggerClaim(walletAddress)}
      />
    </Card>
  );
};
