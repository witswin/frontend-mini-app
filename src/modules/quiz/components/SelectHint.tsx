import { BottomModal } from "@/components/BottomModal";
import { useHintsDispatch } from "@/modules/question/hooks";
import { HINTS } from "@/types";
import { Box, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useId } from "react";
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";

interface HintProps {
  headline: string;
  subHeadline: string;
  count: number;
  icon: React.JSX.Element;
}

interface HintBoxProps {
  type: keyof typeof HINTS;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  headline: string;
  subHeadline: string;
  count: number;
  icon: React.JSX.Element;
}
const HintBox = ({
  type,
  setIsOpen,
  count,
  headline,
  icon,
  subHeadline,
}: HintBoxProps) => {
  const setHints = useHintsDispatch();

  const id = useId();
  return (
    <Box
      w="full"
      h="full"
      onClick={() => {
        setHints((prevState) => {
          return {
            ...prevState,
            selectedHints: [
              ...prevState.selectedHints,
              { type: HINTS[type], id: id },
            ],
          };
        });
        setIsOpen(false);
      }}
      cursor="pointer"
    >
      <Hint
        key={type}
        headline={headline}
        subHeadline={subHeadline}
        count={count}
        icon={icon}
      />
    </Box>
  );
};

const Hint = ({ headline, subHeadline, count, icon }: HintProps) => {
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
  return (
    <BottomModal
      title="Select Your Hint"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <VStack w="full" gap="12px">
        {Object.entries(hints).map(([key, hint]) => (
          <HintBox
            headline={hint.headline}
            subHeadline={hint.subHeadline}
            count={hint.count}
            icon={hint.icon}
            type={key as keyof typeof HINTS}
            setIsOpen={setIsOpen}
            key={key}
          />
        ))}
      </VStack>
    </BottomModal>
  );
};
