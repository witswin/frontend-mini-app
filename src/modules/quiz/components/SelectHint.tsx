import { BottomModal } from "@/components/BottomModal";
import { useHintsDispatch } from "@/modules/question/hooks";
import { HINTS } from "@/types";
import { Box, ButtonProps, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";

interface HintProps {
  headline: string;
  subHeadline: string;
  count: number;
  icon: React.JSX.Element;
}

const Hint = ({
  headline,
  subHeadline,
  count,
  icon,
}: HintProps & ButtonProps) => {
  return (
    <HStack
      w="full"
      h="68px"
      p="12px"
      justifyContent="space-between"
      borderRadius="8px"
      bg="glassBackground"
    >
      <HStack h="full" gap="12px">
        {icon}
        <VStack gap="2px" alignItems="start">
          <Text fontSize="md" fontWeight={700} color="gray.20">
            {headline}
          </Text>
          <Text fontSize="sm" fontWeight={500} color="gray.60">
            {subHeadline}
          </Text>
        </VStack>
      </HStack>

      <Tag size="lg" variant="colored">
        {count}
      </Tag>
    </HStack>
  );
};

const hints = {
  [HINTS.fiftyFifty]: {
    headline: "50/50",
    subHeadline: "Remove 2 Answers",
    count: 2,
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
    count: 2,
    icon: (
      <AlarmAdd iconStyle="Bold" size={32} color="var(--chakra-colors-blue)" />
    ),
  },
  [HINTS.stats]: {
    headline: "Audience Poll",
    subHeadline: "See Others Answers",
    count: 2,
    icon: (
      <UsersGroupTwoRounded
        iconStyle="Bold"
        size={32}
        color="var(--chakra-colors-blue)"
      />
    ),
  },
};
export const SelectHint = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const setHints = useHintsDispatch();
  console.log(HINTS["extraTime"]);

  return (
    <BottomModal
      title="Select Your Hint"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <VStack w="full" gap="12px">
        {Object.entries(hints).map(([key, hint]) => (
          <Box
            w="full"
            h="full"
            key={key}
            onClick={() => {
              setHints((prevState) => ({
                ...prevState,
                selectedHints: [
                  ...prevState.selectedHints,
                  HINTS[key as keyof typeof HINTS],
                ],
              }));
              setIsOpen(false);
            }}
            cursor="pointer"
          >
            <Hint
              key={key}
              headline={hint.headline}
              subHeadline={hint.subHeadline}
              count={hint.count}
              icon={hint.icon}
            />
          </Box>
        ))}
      </VStack>
    </BottomModal>
  );
};
