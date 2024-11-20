import { BoxProps, VStack } from "@chakra-ui/react";
import React from "react";

export const Card = ({ children }: BoxProps) => {
  return (
    <VStack
      bg="glassBackground"
      borderRadius="10px"
      p="16px"
      gap="16px"
      w="full"
    >
      {children}
    </VStack>
  );
};
