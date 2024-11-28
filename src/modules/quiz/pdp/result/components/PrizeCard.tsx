import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ColorFullText } from '@/components/ColorFullText';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuthorization';
import Link from 'next/link';

export const PrizeCard = ({
  prizeCount,
  isSelfWinner,
}: {
  prizeCount: number;
  isSelfWinner: boolean;
}) => {
  const [prizeOpen, setPrizeOpen] = useState(false);
  const authInfo = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrizeOpen(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack
      w="full"
      p={{ base: '8px', sm: '16px' }}
      gap={{ base: '8px', sm: '16px' }}
      bg="glassBackground"
      borderRadius="16px"
      height="full"
      {...(isSelfWinner && {
        justifyContent: 'center',
      })}
    >
      <Box position="relative">
        <Box position="relative" zIndex={10}>
          <Image
            src={'/assets/images/result/gift-box.svg'}
            width={150}
            height={220}
            alt="Prize"
            style={{ zIndex: 10 }}
          />
        </Box>
        <Box position="absolute" top={0} left={0} zIndex={5}>
          <Image
            src={'/assets/images/result/gift-interior.svg'}
            width={150}
            height={220}
            alt="Prize"
            style={{ zIndex: 5 }}
          />
        </Box>

        <Box position="absolute" top={'80px'} left={0} zIndex={20}>
          <motion.div
            animate={prizeOpen ? { y: '-80px' } : {}}
            transition={{ duration: 1 }}
          >
            <Image
              src={'/assets/images/result/gift-door.svg'}
              width={150}
              height={220}
              alt="Prize"
            />
          </motion.div>
        </Box>

        <Box position="absolute" top={0} left={0} zIndex={7}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={prizeOpen ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Image
              src={'/assets/images/result/gift-light.svg'}
              width={150}
              height={220}
              alt="Prize"
            />

            <VStack
              w="full"
              h="full"
              position="absolute"
              top={0}
              justifyContent="center"
              gap={0}
              pb="6px"
            >
              <ColorFullText fontSize="6xl" textContent={`${prizeCount} `} />
              <ColorFullText mt="-6px" fontSize="sm" textContent={`USDT`} />
            </VStack>
          </motion.div>
        </Box>
      </Box>
      <ColorFullText
        textAlign="center"
        whiteSpace="pre-line"
        fontSize={{ base: 'xl', sm: '5xl' }}
        textContent={
          isSelfWinner
            ? `Incredible!\n You're the only winner!`
            : "Awesome, you're a winner!"
        }
      />
      <span style={{ textAlign: 'center' }}>
        <Text
          as="span"
          whiteSpace="nowrap"
          color="green.400"
          fontSize={{ base: 'sm', sm: 'lg' }}
          fontWeight={700}
          wordBreak="normal"
        >
          {`${prizeCount} USDT `}
        </Text>
        <Text
          as="span"
          color="green.0"
          fontSize={{ base: 'sm', sm: 'lg' }}
          fontWeight={700}
          wordBreak="normal"
        >
          has been added to your account.{' '}
        </Text>

        <Text
          as="span"
          color="green.0"
          fontSize={{ base: 'sm', sm: 'lg' }}
          fontWeight={700}
        >
          You can claim the rewards by navigating to your profile page.
        </Text>
      </span>
      <Flex gap={3}>
        {authInfo?.wallets?.length > 0 ? (
          <Link href={`/profile/${authInfo?.pk}`}>
            <Button>Claim Now on profile page</Button>
          </Link>
        ) : (
          <Link href={`/settings?popAddWalletModal=1`}>
            <Button>Add Wallet Before Claim</Button>
          </Link>
        )}
      </Flex>
    </VStack>
  );
};
