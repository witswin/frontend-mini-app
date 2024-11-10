import { BottomModal } from "@/components/BottomModal";
import { useHintsDispatch } from "@/modules/question/hooks";
import { HINTS } from "@/types";
import { Box, Button, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useId, useMemo } from "react";
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";
import { useSelectedQuiz, useSelectedQuizDispatch } from "../hooks";

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
  const setSelectedQuiz = useSelectedQuizDispatch();

  const id = useId();
  return (
    <Box
      w="full"
      h="full"
      as={Button}
      variant="ghost"
      isDisabled={!count}
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

        setSelectedQuiz((prevState) => ({
          ...prevState,
          builtInHints: prevState.builtInHints.map((hints) =>
            hints.hint.hintType === type
              ? {
                  ...hints,
                  count: count - 1,
                }
              : hints
          ),
        }));
        setIsOpen(false);
      }}
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

export const SelectHint = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedQuiz = useSelectedQuiz();

  const allHints = useMemo(
    () => ({
      [HINTS.fifty]: (
        <HintBox
          headline="50/50"
          subHeadline="Remove 2 Answers"
          count={
            selectedQuiz.builtInHints.filter(
              (hints) => hints.hint.hintType === "fifty"
            )[0]?.count || 0
          }
          icon={
            <Widget
              iconStyle="BoldDuotone"
              size={32}
              color="var(--chakra-colors-blue)"
            />
          }
          type={HINTS.fifty}
          setIsOpen={setIsOpen}
          key={1}
        />
      ),
      [HINTS.time]: (
        <HintBox
          headline="Extra Time"
          subHeadline="3 More Seconds"
          count={
            selectedQuiz.builtInHints.filter(
              (hints) => hints.hint.hintType === "time"
            )[0]?.count || 0
          }
          icon={
            <AlarmAdd
              iconStyle="Bold"
              size={32}
              color="var(--chakra-colors-blue)"
            />
          }
          type={HINTS.time}
          setIsOpen={setIsOpen}
          key={2}
        />
      ),
      [HINTS.stats]: (
        <HintBox
          headline="Audience Poll"
          subHeadline="See Others Answers"
          count={
            selectedQuiz.builtInHints.filter(
              (hints) => hints.hint.hintType === "stats"
            )[0]?.count || 0
          }
          icon={
            <UsersGroupTwoRounded
              iconStyle="Bold"
              size={32}
              color="var(--chakra-colors-blue)"
            />
          }
          type={HINTS.stats}
          setIsOpen={setIsOpen}
          key={3}
        />
      ),
    }),
    [selectedQuiz]
  );

  return (
    <BottomModal
      title="Select Your Hint"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <VStack w="full" gap="12px">
        {selectedQuiz.builtInHints.map(
          (h) => allHints[h.hint.hintType as HINTS]
        )}
      </VStack>
    </BottomModal>
  );
};
