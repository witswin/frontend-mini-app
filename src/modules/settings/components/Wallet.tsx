import { Card } from '@/modules/profile/components/Card';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { CardSection } from './CardSection';
import { useAuth, useAuthDispatch } from '@/hooks/useAuthorization';
import { textTruncator } from '@/utils';
import { Pen2 } from 'solar-icon-set';
import { BottomModal } from '@/components/BottomModal';
import { useState } from 'react';
import { Address, isAddress } from 'viem';
import { axiosClient } from '@/configs/axios';
import { AxiosError } from 'axios';

const Wallet = () => {
  const authInfo = useAuth();
  const authInfoDispatch = useAuthDispatch();
  const wallet = authInfo?.wallets?.[0]?.walletAddress;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [walletAddress, setWalletAddress] = useState<Address>(wallet);

  const [isLoading, setLoading] = useState(false);

  const toast = useToast({
    position: 'bottom',
  });
  const handleClick = () => {
    setLoading(true);
    if (!!wallet) {
      axiosClient
        .post(
          '/auth/change-wallet-unsafe/',
          {
            address: walletAddress,
          },
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          },
        )
        .then((res) => {
          authInfoDispatch((prev) => ({
            ...prev,
            wallets: [res.data],
          }));
          toast({
            description: 'Your wallet address has been saved.',
            title: 'Wallet Address Saved',
            status: 'success',
          });
          onClose();
        })
        .catch((error: AxiosError<{ message: string }>) => {
          toast({ description: error.response.data.message, status: 'error' });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axiosClient
        .post(
          '/auth/add-wallet-unsafe/',
          {
            address: walletAddress,
          },
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          },
        )
        .then((res) => {
          authInfoDispatch((prev) => ({
            ...prev,
            wallets: [res.data],
          }));
          toast({
            description: 'Your wallet address has been saved.',
            title: 'Wallet Address Saved',
            status: 'success',
          });
          onClose();
        })
        .catch((error: AxiosError<{ message: string }>) => {
          toast({ description: error.response.data.message, status: 'error' });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Card>
        <Text
          color="gray.0"
          fontSize="19px"
          fontWeight="700"
          fontFamily="Kanit"
        >
          Wallet
        </Text>
        <CardSection
          p="2px"
          background="glassBackground"
          {...(wallet && {
            borderLeft: '4px solid #6E81EE',
          })}
        >
          <HStack width="full" justifyContent="space-between">
            <VStack alignItems="flex-start">
              <Text
                textAlign="left"
                fontSize={wallet ? '10px' : '15px'}
                fontWeight="600"
                color={wallet ? 'gray.60' : 'gray.20'}
              >
                EVM Wallet
              </Text>
              {wallet && (
                <Text
                  color="gray.0"
                  fontSize="15px"
                  fontWeight="500"
                  lineHeight="22px"
                >
                  {textTruncator(wallet)}
                </Text>
              )}
            </VStack>
            <Button onClick={onOpen} variant={wallet ? 'default' : 'outline'}>
              {wallet ? (
                <HStack>
                  <Pen2 size={16} iconStyle="Linear" />
                  <Text>Edit</Text>
                </HStack>
              ) : (
                'Connect'
              )}
            </Button>
          </HStack>
        </CardSection>
      </Card>
      <BottomModal isOpen={isOpen} onClose={onClose}>
        <VStack rowGap="24px">
          <Text
            fontSize="19px"
            fontWeight="600"
            color="gray.0"
            width="full"
            textAlign="center"
          >
            Connect Your EVM Wallet
          </Text>
          <FormControl isInvalid={!isAddress(walletAddress)}>
            <FormLabel>Wallet Address</FormLabel>
            <Input
              placeholder={`e.g., 0x1234...ABCD`}
              height="46px"
              variant="outline"
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value as Address);
              }}
            />
            {!isAddress(walletAddress) ? (
              <Text mt="6px" fontSize="13px" fontWeight="500" color="red.400">
                Please enter a valid Ethereum wallet address (42 characters,
                starting with &apos;0x&apos;)
              </Text>
            ) : (
              <Text mt="6px" color="gray.60" fontSize="13px" fontWeight="500">
                Public address only. Never share your private key.
              </Text>
            )}
          </FormControl>
          <HStack width="full" columnGap="16px">
            <Button size="md" onClick={onClose} variant="gray" width="full">
              Cancel
            </Button>
            <Button
              onClick={handleClick}
              isLoading={isLoading}
              size="md"
              isDisabled={!isAddress(walletAddress) || isLoading}
              width="full"
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </BottomModal>
    </>
  );
};

export default Wallet;
