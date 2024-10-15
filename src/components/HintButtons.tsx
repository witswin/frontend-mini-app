import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ClockPlus, FiftyFifty, UsersGroup } from "./Icons";
import { HINTS } from "@/types";

export const HintButton = ({
  hintType,
  isDisabled,
}: {
  hintType: HINTS;
  isDisabled?: boolean;
}) => {
  const selectedHint: {
    [key in HINTS]: {
      headline: string;
      icon: React.ReactNode;
    };
  } = useMemo(
    () => ({
      [HINTS.fiftyFifty]: {
        headline: "50/50",
        icon: <FiftyFifty isDisabled={isDisabled} width={22} height={22} />,
      },
      [HINTS.extraTime]: {
        headline: "Extra Time",
        icon: <ClockPlus isDisabled={isDisabled} width={22} height={22} />,
      },
      [HINTS.stats]: {
        headline: "Audience Poll",
        icon: <UsersGroup isDisabled={isDisabled} width={22} height={22} />,
      },
    }),
    [isDisabled]
  );

  return (
    <VStack
      p="1px"
      borderRadius="10px"
      as={Button}
      variant="ghost"
      isDisabled={isDisabled}
      _disabled={{ bg: "gray.400", opacity: "1" }}
      _hover={{ bg: "primaryRadial" }}
      _focus={{ bg: "primaryRadial" }}
      bg={"primaryRadial"}
      h="52px"
      w="full"
    >
      <HStack
        bg="gray.700"
        p="8px"
        borderRadius="10px"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        w="full"
        h="full"
      >
        {selectedHint[hintType].icon}

        <Text
          fontSize="sm"
          fontWeight="700"
          color={isDisabled ? "gray.400" : "gray.0"}
        >
          {selectedHint[hintType].headline}
        </Text>
      </HStack>
    </VStack>
  );
};
