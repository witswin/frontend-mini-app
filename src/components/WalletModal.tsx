import { axiosClient } from '@/configs/axios';
import { useAuth, useAuthDispatch } from '@/hooks/useAuthorization';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Address, isAddress } from 'viem';

interface WalletModalProps extends UseDisclosureProps {}

export const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const authInfo = useAuth();

  const authInfoDispatch = useAuthDispatch();
  const wallet = authInfo?.wallets?.[0]?.walletAddress;

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        p="0"
        background="var(--chakra-colors-cardBackground)"
        width="538px"
        backdropFilter="blur(50px)"
        borderStartStartRadius="24px"
        borderStartEndRadius="24px"
        borderEndStartRadius="12px"
        borderEndEndRadius="12px"
      >
        <ModalBody
          backdropFilter="blur(50px)"
          width="full"
          p={'0'}
          margin="0"
          borderStartStartRadius="24px"
          borderStartEndRadius="24px"
          borderEndStartRadius="12px"
          borderEndEndRadius="12px"
          zIndex={1000}
        >
          <VStack
            p="16px"
            mx="auto"
            borderStartStartRadius="24px"
            borderStartEndRadius="24px"
            borderEndStartRadius="12px"
            borderEndEndRadius="12px"
            borderTop="2px solid"
            borderColor="cyan"
            boxShadow="0 5px 0px rgb(32,32,51), 1px 0px 0px   rgb(32,32,51), -1px 0px 0px rgb(32,32,51)"
            gap="16px"
            width="full"
          >
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
                  <Text
                    mt="6px"
                    fontSize="13px"
                    fontWeight="500"
                    color="red.400"
                  >
                    Please enter a valid Ethereum wallet address (42 characters,
                    starting with &apos;0x&apos;)
                  </Text>
                ) : (
                  <Text
                    mt="6px"
                    color="gray.60"
                    fontSize="13px"
                    fontWeight="500"
                  >
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
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
