import { BottomModal } from "@/components/BottomModal";
import { useHintsDispatch } from "@/modules/question/hooks";
import { HINTS } from "@/types";
import { Box, Button, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useId } from "react";
// import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";
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

  console.log(
    selectedQuiz.builtInHints.filter(
      (hints) => hints.hint.hintType === HINTS.fifty
    )[0]
  );

  // const hints = {
  //   [HINTS.fifty]: {
  //     headline: "50/50",
  //     subHeadline: "Remove 2 Answers",
  //     count: 2,
  //     icon: (
  //       <Widget
  //         iconStyle="BoldDuotone"
  //         size={32}
  //         color="var(--chakra-colors-blue)"
  //       />
  //     ),
  //   },
  //   [HINTS.extraTime]: {
  //     headline: "Extra Time",
  //     subHeadline: "3 More Seconds",
  //     count: 2,
  //     icon: (
  //       <AlarmAdd
  //         iconStyle="Bold"
  //         size={32}
  //         color="var(--chakra-colors-blue)"
  //       />
  //     ),
  //   },
  //   [HINTS.stats]: {
  //     headline: "Audience Poll",
  //     subHeadline: "See Others Answers",
  //     count: 2,
  //     icon: (
  //       <UsersGroupTwoRounded
  //         iconStyle="Bold"
  //         size={32}
  //         color="var(--chakra-colors-blue)"
  //       />
  //     ),
  //   },
  // };

  return (
    <BottomModal
      title="Select Your Hint"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <VStack w="full" gap="12px">
        {/* {Object.entries(hints).map(([key, hint]) => (
          <HintBox
            headline={hint.headline}
            subHeadline={hint.subHeadline}
            count={hint.count}
            icon={hint.icon}
            type={key as keyof typeof HINTS}
            setIsOpen={setIsOpen}
            key={key}
          />
        ))} */}
        {selectedQuiz.builtInHints.map((hint, key) => (
          <HintBox
            headline={hint.hint.title}
            subHeadline={hint.hint.description}
            count={hint.count}
            icon={<></>}
            type={hint.hint.hintType as keyof typeof HINTS}
            setIsOpen={setIsOpen}
            key={key}
          />
        ))}

        {/* <HintBox
          headline={selectedQuiz.builtInHints..headline}
          subHeadline={hint.subHeadline}
          count={hint.count}
          icon={hint.icon}
          type={key as keyof typeof HINTS}
          setIsOpen={setIsOpen}
          key={key}
        /> */}
      </VStack>
    </BottomModal>
  );
};
