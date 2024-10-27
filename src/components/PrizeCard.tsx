import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ColorFullText } from "./ColorFullText";
import Image from "next/image";
import PrizeOpen from "@/assets/prize-open.svg";
import PrizeColse from "@/assets/prize-close.svg";

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
        <Image src={prizeOpen ? PrizeOpen : PrizeColse} alt="Prize" />
        {prizeOpen && (
          <VStack
            w="full"
            h="full"
            position="absolute"
            top={0}
            justifyContent="center"
            gap='0'
            pb='6px'
          >
            <ColorFullText fontSize='6xl' textContent={`${prizeCount} `} />
            <ColorFullText fontSize='sm' textContent={`USDT`} />
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
