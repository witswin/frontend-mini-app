import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TbX } from "react-icons/tb";
import { ClockPlus, FiftyFifty, Plus, UsersGroup } from "./Icons";
import { HINTS } from "@/types";

export const HintCard = ({ hintType }: { hintType?: HINTS }) => {
  const isHintCardEmpty = hintType === undefined;

  const selectedHint = useMemo(
    () => ({
      [HINTS.fiftyFifty]: {
        headline: "50/50",
        subHeadline: "Remove 2 Answers",
        icon: <FiftyFifty />,
      },
      [HINTS.extraTime]: {
        headline: "Extra Time",
        subHeadline: "3 More Seconds",
        icon: <ClockPlus />,
      },
      [HINTS.stats]: {
        headline: "Audience Poll",
        subHeadline: "See Others Answers",
        icon: <UsersGroup />,
      },
    }),
    []
  );

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
      w="full"
      onClick={isHintCardEmpty && (() => {})}
      cursor={isHintCardEmpty ? "pointer" : "default"}
    >
      {isHintCardEmpty ? (
        <Plus />
      ) : (
        <>
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

          {selectedHint[hintType].icon}

          <VStack gap="2px" w="full">
            <Text fontSize="lg" color="gray.0">
              {selectedHint[hintType]?.headline}
            </Text>
            <Text fontSize="sm" color="gray.60">
              {selectedHint[hintType]?.subHeadline}
            </Text>
          </VStack>
        </>
      )}
    </Card>
  );
};
