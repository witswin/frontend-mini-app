import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { TbX } from "react-icons/tb";
import { ClockPlus, FiftyFifty, Plus, UsersGroup } from "./Icons";
import { HINTS } from "@/types";

interface HINTS_OBJECT {
  hintObject: {
    hint: HINTS;
    hints: HINTS[];
    setHints: Dispatch<SetStateAction<HINTS[] | undefined[]>>;
  };
}

export const HintCard = ({ hintObject }: HINTS_OBJECT) => {
  const { hint, hints, setHints } = hintObject;

  const isHintCardEmpty = hint === undefined;

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
      bg="glassBackground"
      p="8px"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      gap="8px"
      h="102px"
      w="full"
      {...(isHintCardEmpty && { onClick: () => {} })}
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
            onClick={(e) => {
              e.stopPropagation();
              setHints(hints.filter((h) => h !== hint));
            }}
            cursor="pointer"
          >
            <TbX color="gray.60" />
          </Box>

          {selectedHint[hint].icon}

          <VStack gap="2px" w="full">
            <Text fontSize="lg" color="gray.0">
              {selectedHint[hint]?.headline}
            </Text>
            <Text fontSize="sm" color="gray.60">
              {selectedHint[hint]?.subHeadline}
            </Text>
          </VStack>
        </>
      )}
    </Card>
  );
};
