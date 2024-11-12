import { choice } from "@/globalTypes";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useHints, useQuestionData } from "@/modules/question/hooks";
import { HINTS, QUESTION_STATE } from "@/types";
import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";

interface ChoiceButtonProps extends ButtonProps {
  choice: choice;
  selectedChoice: number;
  disabledFiftyFiftyHint?: boolean;
  setSelectedChoice: Dispatch<SetStateAction<number>>;
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
  choice,
  selectedChoice,
  setSelectedChoice,
  disabledFiftyFiftyHint,
  ...buttonProps
}: ChoiceButtonProps) => {
  const { question } = useQuestionData();

  const { socket } = useWebSocket();

  const handleClick = () => {
    if (
      (question?.state === QUESTION_STATE.default ||
        question?.state === QUESTION_STATE.alert) &&
      question.isEligible
    ) {
      setSelectedChoice(choice?.id);

      socket.current.client?.send(
        JSON.stringify({
          command: "ANSWER",
          args: {
            questionId: question.id,
            selectedChoiceId: choice.id,
          },
        })
      );
    }
  };
  const hints = useHints();

  const showStatsHint = useMemo(
    () =>
      hints.usedHints.find(
        (item) =>
          item.hintType === HINTS.stats && item.questionId === question?.id
      ),
    [question, hints.usedHints]
  );
  const variant = useMemo(
    () => ({
      [QUESTION_STATE.default]:
        +selectedChoice === +choice?.id ? "pressed" : "default",
      [QUESTION_STATE.freeze]: "default",
      [QUESTION_STATE.answered]:
        +selectedChoice === +choice?.id &&
        +selectedChoice === question?.correct?.answerId
          ? "rightAnswer"
          : +selectedChoice === +choice?.id &&
            +selectedChoice !== question?.correct?.answerId
          ? "wrongAnswer"
          : +question?.correct?.answerId === +choice?.id
          ? "rightAnswer"
          : "default",
      [QUESTION_STATE.alert]:
        +selectedChoice === +choice?.id ? "pressed" : "default",
    }),
    [question?.correct, selectedChoice]
  );

  return (
    <HStack
      borderRadius="8px"
      overflow="hidden"
      position="relative"
      width="full"
    >
      {question?.state !== QUESTION_STATE.rest && (
        <Button
          variant={variant[question?.state]}
          color="gray.0"
          size="md"
          height="54px"
          width="full"
          onClick={handleClick}
          isDisabled={
            (question?.state === QUESTION_STATE.freeze &&
              +selectedChoice !== +choice?.id) ||
            (question?.state === QUESTION_STATE.answered &&
              +choice?.id !== question?.correct.answerId &&
              +selectedChoice !== +choice?.id) ||
            disabledFiftyFiftyHint
          }
          as={motion.button}
          key={question?.state}
          {...buttonProps}
          {...(+selectedChoice === +choice?.id &&
            question?.state === QUESTION_STATE.freeze && {
              animate,
            })}
        >
          {choice?.text}
        </Button>
      )}
      <AnimatePresence>
        {question?.state !== QUESTION_STATE.freeze &&
          question?.state !== QUESTION_STATE.answered &&
          showStatsHint && (
            <>
              <motion.div
                style={{
                  position: "absolute",
                  left: "0",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  // borderTopRightRadius: +choice?.stats === 100 ? "8px" : "0",
                  // borderBottomRightRadius: +choice?.stats === 100 ? "8px" : "0",
                  zIndex: -1,
                  height: "100% ",
                  width: 0,
                  // background:
                  //   selectedChoice === choice?.id
                  //     ? "rgba(256, 256, 256, 0.2)"
                  //     : "#6E81EE5C",
                }}
                // animate={{ width: `${choice?.stats}%` }}
              />
              <Text
                fontSize="md"
                color="gray.0"
                position="absolute"
                right="12px"
              >
                {/* {choice?.stats}% */}
              </Text>
            </>
          )}
      </AnimatePresence>
    </HStack>
  );
};
