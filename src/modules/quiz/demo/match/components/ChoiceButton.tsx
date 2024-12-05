import { choice } from '@/globalTypes';
import { QUESTION_STATE } from '@/types';
import { Button, ButtonProps, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useDemoQuizData, useDemoQuizDispatch } from '../hooks';

interface ChoiceButtonProps extends ButtonProps {
  choice: choice;
  disabledFiftyFiftyHint?: boolean;
}

const animate = {
  background: [
    'rgba(256, 256, 256, 0.2)',
    'rgba(256, 256, 256, 0.4)',
    'rgba(256, 256, 256, 0.2)',
  ],
  boxShadow: '0px 1px 0px 0px #FFFFFF, 0px 0px 0px 0px #FFFFFF66',
  transition: { duration: 0.5, repeat: Infinity, delay: 0.1 },
};

export const ChoiceButton = ({
  choice,
  disabledFiftyFiftyHint,
  ...buttonProps
}: ChoiceButtonProps) => {
  const demoQuizData = useDemoQuizData();
  const question = demoQuizData.question[demoQuizData.activeQuestionId];

  const demoQuizDispatch = useDemoQuizDispatch();

  const handleClick = () => {
    if (
      question?.state === QUESTION_STATE.default ||
      question?.state === QUESTION_STATE.alert
    ) {
      demoQuizDispatch((prev) => ({
        ...prev,
        question: prev.question.map((item) => {
          if (prev.activeQuestionId === item.id) {
            return { ...item, selectedChoice: choice.id };
          } else {
            return item;
          }
        }),
      }));
    }
  };

  const variant = useMemo(
    () => ({
      [QUESTION_STATE.default]:
        +question?.selectedChoice === +choice?.id ? 'pressed' : 'default',
      [QUESTION_STATE.freeze]: 'default',
      [QUESTION_STATE.answered]:
        +question?.selectedChoice === +choice?.id &&
        +question?.selectedChoice === question?.correct
          ? 'rightAnswer'
          : +question?.selectedChoice === +choice?.id &&
            +question?.selectedChoice !== question?.correct
          ? 'wrongAnswer'
          : +question?.correct === +choice?.id
          ? 'rightAnswer'
          : 'default',
      [QUESTION_STATE.alert]:
        +question?.selectedChoice === +choice?.id ? 'pressed' : 'default',
    }),
    [question?.correct, question.selectedChoice],
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
          minH="54px"
          height="fit-content"
          width="full"
          onClick={handleClick}
          isDisabled={
            (question?.state === QUESTION_STATE.freeze &&
              +question?.selectedChoice !== +choice?.id) ||
            (question?.state === QUESTION_STATE.answered &&
              +choice?.id !== question?.correct &&
              +question?.selectedChoice !== +choice?.id) ||
            disabledFiftyFiftyHint
          }
          as={motion.button}
          key={question?.state}
          whiteSpace="break-spaces"
          {...buttonProps}
          {...(+question?.selectedChoice === +choice?.id &&
            question?.state === QUESTION_STATE.freeze && {
              animate,
            })}
        >
          {choice?.text}
        </Button>
      )}
    </HStack>
  );
};
