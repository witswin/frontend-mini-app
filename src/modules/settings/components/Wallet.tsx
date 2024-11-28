import { Card } from '@/modules/profile/components/Card';
import { Button, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { CardSection } from './CardSection';
import { useAuth } from '@/hooks/useAuthorization';
import { textTruncator } from '@/utils';
import { Pen2 } from 'solar-icon-set';
import { WalletModal } from '@/components/WalletModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Wallet = () => {
  const authInfo = useAuth();
  const wallet = authInfo?.wallets?.[0]?.walletAddress;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    if (!router.query.popAddWalletModal) return;
    else if (router.query.popAddWalletModal && !wallet) onOpen();
  }, [onOpen, router.query, wallet]);

  return (
    <VStack width="full" position="relative" bottom="0" left="0">
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
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Wallet;
