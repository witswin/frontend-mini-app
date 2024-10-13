import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ClockPlus, FiftyFifty, UsersGroup } from "./Icons";
import { HINT_BUTTONS } from "@/types";

export const HintButton = ({
  hintType,
  isDisabled,
}: {
  hintType: HINT_BUTTONS;
  isDisabled?: boolean;
}) => {
  const selectedHint: {
    [key in HINT_BUTTONS]: {
      headline: string;
      icon: React.ReactNode;
    };
  } = useMemo(
    () => ({
      [HINT_BUTTONS.fiftyFifty]: {
        headline: "50/50",
        icon: <FiftyFifty isDisabled={isDisabled} width={22} height={22} />,
      },
      [HINT_BUTTONS.extraTime]: {
        headline: "Extra Time",
        icon: <ClockPlus isDisabled={isDisabled} width={22} height={22} />,
      },
      [HINT_BUTTONS.stats]: {
        headline: "Audience Poll",
        icon: <UsersGroup isDisabled={isDisabled} width={22} height={22} />,
      },
    }),
    [isDisabled]
  );

  return (
    <VStack
      bg={"primaryRadial"}
      p="1px"
      borderRadius="10px"
      as={Button}
      variant="ghost"
      isDisabled={isDisabled}
      _disabled={{ bg: "gray.400", opacity: "1" }}
      h="52px"
      w="171px"
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
