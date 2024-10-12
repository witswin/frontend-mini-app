import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ClockPlus, FiftyFifty, UsersGroup } from "./Icons";

interface LargeCardProps {
  headline: string;
  icon: (props?: {
    isDisabled?: boolean;
    width?: number;
    height?: number;
  }) => JSX.Element;
  isDisabled?: boolean;
}

const ContainerCard = ({ headline, icon, isDisabled }: LargeCardProps) => {
  return (
    <VStack
      bg={isDisabled ? "gray.400" : "primaryRadial"}
      p="1px"
      borderRadius="10px"
    >
      <HStack
        cursor={isDisabled ? "default" : "pointer"}
        bg="gray.700"
        p="8px"
        borderRadius="10px"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        h="52px"
        w="171px"
      >
        {icon({ isDisabled: isDisabled, height: 22, width: 22 })}

        <Text
          fontSize="sm"
          fontWeight="700"
          color={isDisabled ? "gray.400" : "gray.0"}
        >
          {headline}
        </Text>
      </HStack>
    </VStack>
  );
};

export const FiftyFiftyHint = () => {
  const state = false;
  return (
    <Box onClick={() => {}}>
      <ContainerCard headline="50/50" icon={FiftyFifty} isDisabled={state} />
    </Box>
  );
};

export const Stats = () => {
  const state = false;
  return (
    <Box onClick={() => {}}>
      <ContainerCard
        headline="Audience Poll"
        icon={UsersGroup}
        isDisabled={state}
      />
    </Box>
  );
};

export const ExtraTime = () => {
  const state = false;
  return (
    <Box onClick={() => {}}>
      <ContainerCard
        headline="Extra Time"
        icon={ClockPlus}
        isDisabled={state}
      />
    </Box>
  );
};
