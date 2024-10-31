import { useHints, useQuestionData } from "@/modules/question/hooks";
import { HINTS, QUESTION_STATE } from "@/types";
import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";

interface ChoiceButtonProps extends ButtonProps {
  buttonInfo: {
    title: string;
    id: string;
    stats: string;
  };
  selectedChoice: string;
  disabledFiftyFiftyHint?: boolean;
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
  disabledFiftyFiftyHint,
  ...buttonProps
}: ChoiceButtonProps) => {
  const { questions, activeQuestionId } = useQuestionData();

  const { state, correct } = questions.find(
    (item) => item.id === activeQuestionId
  );

  const handleClick = () => {
    if (state === QUESTION_STATE.default || state === QUESTION_STATE.alert) {
      setSelectedChoice(buttonInfo.id);
    }
  };
  const hints = useHints();

  const showStatsHint = useMemo(
    () =>
      hints.usedHints.find(
        (item) =>
          item.hintType === HINTS.stats && item.questionId === activeQuestionId
      ),
    [activeQuestionId, hints.usedHints]
  );
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
    <HStack
      borderRadius="8px"
      overflow="hidden"
      position="relative"
      width="full"
    >
      {state !== QUESTION_STATE.rest && (
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
              +selectedChoice !== +buttonInfo.id) ||
            disabledFiftyFiftyHint
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
        </Button>
      )}
      <AnimatePresence>
        {state !== QUESTION_STATE.freeze &&
          state !== QUESTION_STATE.answered &&
          showStatsHint && (
            <>
              <motion.div
                style={{
                  position: "absolute",
                  left: "0",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderTopRightRadius: +buttonInfo.stats === 100 ? "8px" : "0",
                  borderBottomRightRadius:
                    +buttonInfo.stats === 100 ? "8px" : "0",
                  zIndex: -1,
                  height: "100% ",
                  width: 0,
                  background:
                    selectedChoice === buttonInfo.id
                      ? "rgba(256, 256, 256, 0.2)"
                      : "#6E81EE5C",
                }}
                animate={{ width: `${buttonInfo.stats}%` }}
              />
              <Text
                fontSize="md"
                color="gray.0"
                position="absolute"
                right="12px"
              >
                {buttonInfo.stats}%
              </Text>
            </>
          )}
      </AnimatePresence>
    </HStack>
  );
};
