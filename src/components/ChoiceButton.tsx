import { useHints, useQuestionData } from "@/modules/question/hooks";
import { HINTS, QUESTION_STATE } from "@/types";
import { Box, Button, ButtonProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";

interface ChoiceButtonProps extends ButtonProps {
  buttonInfo: {
    title: string;
    id: string;
    stats: string;
  };
  selectedChoice: string;
  setSelectedChoice: Dispatch<SetStateAction<string>>;
}

const animate = {
  background: [
    "rgba(256, 256, 256, 0.2)",
    "rgba(256, 256, 256, 0.4)",
    "rgba(256, 256, 256, 0.2)",
  ],
  boxShadow: "0px 1px 0px 0px #FFFFFF, 0px 0px 0px 0px #FFFFFF66",
  transition: { duration: 0.5, repeat: Infinity, delay: 0.1 },
};

export const ChoiceButton = ({
  buttonInfo,
  selectedChoice,
  setSelectedChoice,
  ...buttonProps
}: ChoiceButtonProps) => {
  const { questions, activeQuestionId } = useQuestionData();
  const hints = useHints();

  const showStatsHint = useMemo(
    () =>
      hints.usedHints.find(
        (item) =>
          item.hintType === HINTS.stats && item.questionId === activeQuestionId
      ),
    [activeQuestionId, hints.usedHints]
  );

  const { state, correct } = questions.find(
    (item) => item.id === activeQuestionId
  );

  const handleClick = () => {
    if (state === QUESTION_STATE.default || state === QUESTION_STATE.alert) {
      setSelectedChoice(buttonInfo.id);
    }
  };

  const variant = useMemo(
    () => ({
      [QUESTION_STATE.default]:
        +selectedChoice === +buttonInfo.id ? "pressed" : "default",
      [QUESTION_STATE.freeze]: "default",
      [QUESTION_STATE.answered]:
        +selectedChoice === +buttonInfo.id && +selectedChoice === correct
          ? "rightAnswer"
          : +selectedChoice === +buttonInfo.id && +selectedChoice !== correct
            ? "wrongAnswer"
            : +correct === +buttonInfo.id
              ? "rightAnswer"
              : "default",
      [QUESTION_STATE.alert]:
        +selectedChoice === +buttonInfo.id ? "pressed" : "default",
    }),
    [correct, selectedChoice]
  );

  return (
    <Button
      variant={variant[state]}
      color="gray.0"
      size="md"
      height="54px"
      width="full"
      onClick={handleClick}
      isDisabled={
        (state === QUESTION_STATE.freeze &&
          +selectedChoice !== +buttonInfo.id) ||
        (state === QUESTION_STATE.answered &&
          +buttonInfo.id !== correct &&
          +selectedChoice !== +buttonInfo.id)
      }
      as={motion.button}
      key={state}
      {...buttonProps}
      {...(+selectedChoice === +buttonInfo.id &&
        state === QUESTION_STATE.freeze && {
          animate,
        })}
    >
      {buttonInfo.title}

      {state !== QUESTION_STATE.freeze &&
        state !== QUESTION_STATE.answered &&
        showStatsHint && (
          <>
            <Box
              position="absolute"
              left="0"
              borderLeftRadius="8px"
              borderRightRadius={+buttonInfo.stats === 100 ? "8px" : "0"}
              zIndex={-1}
              h="full"
              w={`${buttonInfo.stats}%`}
              bg="rgba(256, 256, 256, 0.2)"
            />
            <Text fontSize="md" color="gray.0" position="absolute" right="12px">
              {buttonInfo.stats}%
            </Text>
          </>
        )}
    </Button>
  );
};
