import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import PrizeOpen from "@/assets/prize-open.svg";
// import PrizeColse from "@/assets/prize-close.svg";
import GiftClose from "@/assets/gift-close.svg";
import GiftOpen from "@/assets/gift-open.svg";
import { ColorFullText } from "@/components/ColorFullText";
import TestImage from "@/assets/prizeTest.gif";

export const PrizeCard = ({ prizeCount }: { prizeCount: number }) => {
  const [prizeOpen, setPrizeOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPrizeOpen(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack
      w="full"
      p="16px"
      gap="16px"
      bg="glassBackground"
      borderRadius="16px"
    >
      <Box position="relative">
        <Image src={prizeOpen ? GiftOpen : GiftClose} alt="Prize" />
        {/* <Image src={TestImage} alt="Prize" /> */}
        {prizeOpen && (
          <VStack
            w="full"
            h="full"
            position="absolute"
            top={0}
            justifyContent="center"
            gap="2px"
            pb="6px"
          >
            <ColorFullText fontSize="6xl" textContent={`${prizeCount} `} />
            <ColorFullText fontSize="sm" textContent={`USDT`} />
          </VStack>
        )}
      </Box>
      <ColorFullText fontSize="5xl" textContent="Awesome, you're a winner!" />
      <HStack>
        <Text color="green.400" fontSize="lg" fontWeight={700}>
          {`${prizeCount} USDT`}
        </Text>
        <Text color="green.0" fontSize="lg" fontWeight={700}>
          has been added to your wallet.
        </Text>
      </HStack>
    </VStack>
  );
};
