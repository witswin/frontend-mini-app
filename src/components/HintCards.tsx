import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { HINTS } from "@/types";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";
import { useHintsDispatch } from "@/modules/question/hooks";

export const HintCard = ({ hint }: { hint: HINTS }) => {
  const setHints = useHintsDispatch();

  const isHintCardEmpty = hint === undefined;

  const selectedHint = useMemo(
    () => ({
      [HINTS.fiftyFifty]: {
        headline: "50/50",
        subHeadline: "Remove 2 Answers",
        icon: (
          <Widget
            iconStyle="BoldDuotone"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
      },
      [HINTS.extraTime]: {
        headline: "Extra Time",
        subHeadline: "3 More Seconds",
        icon: (
          <AlarmAdd
            iconStyle="Bold"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
      },
      [HINTS.stats]: {
        headline: "Audience Poll",
        subHeadline: "See Others Answers",
        icon: (
          <UsersGroupTwoRounded
            iconStyle="Bold"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
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
        <AddIcon color="blue" boxSize="32px" fontSize="32px" />
      ) : (
        <>
          <Box
            position="absolute"
            top="9px"
            right="9px"
            color="gray.60"
            onClick={(e) => {
              e.stopPropagation();
              setHints((prevState) => ({
                ...prevState,
                selectedHints: prevState.selectedHints.filter(
                  (h) => h !== hint
                ),
              }));
            }}
            cursor="pointer"
          >
            <CloseIcon color="gray.60" />
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
