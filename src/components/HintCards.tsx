import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TbX } from "react-icons/tb";
import { ClockPlus, FiftyFifty, Plus, UsersGroup } from "./Icons";
import { HINT_Cards } from "@/types";

export const HintCard = ({ hintType }: { hintType: HINT_Cards }) => {
  const selectedHint: {
    [key in HINT_Cards]: {
      headline?: string;
      subHeadline?: string;
      icon: React.ReactNode;
    };
  } = useMemo(
    () => ({
      [HINT_Cards.fiftyFifty]: {
        headline: "50/50",
        subHeadline: "Remove 2 Answers",
        icon: <FiftyFifty />,
      },
      [HINT_Cards.extraTime]: {
        headline: "Extra Time",
        subHeadline: "3 More Seconds",
        icon: <ClockPlus />,
      },
      [HINT_Cards.stats]: {
        headline: "Audience Poll",
        subHeadline: "See Others Answers",
        icon: <UsersGroup />,
      },
      [HINT_Cards.empty]: {
        icon: <Plus />,
      },
    }),
    []
  );
  const isHintCardEmpty = hintType === HINT_Cards.empty;

  return (
    <Card
      bg="rgba(110, 129, 238, 0.08)"
      p="8px"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      gap="8px"
      h="102px"
      w="172px"
      onClick={isHintCardEmpty ? () => {} : undefined}
      cursor={isHintCardEmpty ? "pointer" : "default"}
    >
      {!isHintCardEmpty && (
        <Box
          position="absolute"
          top="9px"
          right="9px"
          color="gray.60"
          onClick={() => {}}
          cursor="pointer"
        >
          <TbX color="gray.60" />
        </Box>
      )}

      {selectedHint[hintType].icon}

      <VStack gap="2px" w="full">
        <Text fontSize="lg" color="gray.0">
          {selectedHint[hintType]?.headline}
        </Text>
        <Text fontSize="sm" color="gray.60">
          {selectedHint[hintType]?.subHeadline}
        </Text>
      </VStack>
    </Card>
  );
};
