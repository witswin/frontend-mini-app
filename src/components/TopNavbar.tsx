import {
  Badge,
  Box,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import HeaderBg from '@/assets/HeaderBgImage.svg';
import Logo from '@/assets/Logo.svg';
import Image from 'next/image';
import { WalletMoney } from 'solar-icon-set';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { useAuth } from '@/hooks/useAuthorization';
import { textTruncator } from '@/utils';
import { useRouter } from 'next/router';

const WalletStatus = () => {
  const authInfo = useAuth();
  return (
    <Badge
      variant={!!authInfo ? 'green' : 'red'}
      size="xs"
      position="absolute"
      left="0"
      bottom="0"
    />
  );
};

export const TopNavbar = () => {
  const [isLarge] = useMediaQuery('(min-width: 500px)');
  const authInfo = useAuth();
  const router = useRouter();

  const { connect, disconnect } = useWalletConnection();

  console.log({ authInfo });

  return (
    <HStack
      h={isLarge ? '120px' : '90px'}
      w="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt="-10px"
      px={isLarge ? '16px' : '0'}
    >
      <Box position="absolute" zIndex="base" width="100%" height="100%">
        <Image
          src={HeaderBg}
          alt="navbar background illustration."
          layout="responsive"
        />
      </Box>

      <HStack
        zIndex="docked"
        w="full"
        justifyContent="space-between"
        px="12px"
        pt={isLarge ? '20px' : '4px'}
      >
        <VStack w="82px">
          <HStack gap="2px">
            {/* <Neuron size={24} /> */}

            {/* <Badge size="sm" variant="glass">
              {"x "}
              {health}
            </Badge> */}
            <Image
              src="/assets/images/home/Neuron.svg"
              alt="neuron"
              width={22}
              height={23}
            />
          </HStack>
          <Text
            whiteSpace="nowrap"
            color="gray.40"
            fontSize="sm"
            fontWeight="bold"
          >
            {`${authInfo?.neuron ?? 0} Neurons`}
          </Text>
        </VStack>

        <VStack>
          <Image src={Logo} alt="wits" />
        </VStack>

        <VStack w="82px" pl="12px" my="auto" justifyContent="center" mr="4px">
          <Box
            cursor="pointer"
            onClick={() => {
              if (!authInfo || !authInfo.wallets.length) {
                disconnect?.();
                setTimeout(() => {
                  connect();
                }, 0);
              }

              router.push('/profile/' + authInfo?.pk);
            }}
            position="relative"
          >
            <WalletMoney
              iconStyle="BoldDuotone"
              color="var(--chakra-colors-blue)"
              size={24}
            />
            <WalletStatus />
          </Box>
          <Text
            color="gray.40"
            fontSize={authInfo && authInfo.wallets.length ? '10px' : 'sm'}
            fontWeight="bold"
          >
            {!!authInfo &&
              !!authInfo.wallets.length &&
              textTruncator(authInfo.wallets[0].walletAddress)}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};
