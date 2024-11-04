import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GiftClose from "@/assets/gift-close.svg";
import GiftOpen from "@/assets/gift-open.svg";
import { ColorFullText } from "@/components/ColorFullText";

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
      p={{ base: "8px", sm: "16px" }}
      gap={{ base: "8px", sm: "16px" }}
      bg="glassBackground"
      borderRadius="16px"
      height="full"
    >
      <Box position="relative">
        <Image src={prizeOpen ? GiftOpen : GiftClose} alt="Prize" />
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
      <ColorFullText
        fontSize={{ base: "xl", sm: "5xl" }}
        textContent="Awesome, you're a winner!"
      />
      <HStack>
        <Text
          whiteSpace="nowrap"
          color="green.400"
          fontSize={{ base: "sm", sm: "lg" }}
          fontWeight={700}
        >
          {`${prizeCount} USDT`}
        </Text>
        <Text
          color="green.0"
          fontSize={{ base: "sm", sm: "lg" }}
          fontWeight={700}
        >
          has been added to your wallet.
        </Text>
      </HStack>
    </VStack>
  );
};
