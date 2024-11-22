import { choice } from '@/globalTypes';
import { useWebSocket } from '@/hooks/useWebSocket';
import {
  useHints,
  useQuestionData,
  useQuestionDataDispatch,
} from '@/modules/question/hooks';
import { HINTS, QUESTION_STATE } from '@/types';
import { Button, ButtonProps, HStack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

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
  const [statsHint, setStatsHint] = useState(null);
  const { question } = useQuestionData();
  const dispatch = useQuestionDataDispatch();
  const hints = useHints();

  const { socket } = useWebSocket();

  const timeHintSpecificForThisQuestion = hints.usedHints.find(
    (item) => item.hintType === HINTS.time && question.id === item.questionId,
  );

  useEffect(() => {
    if (!socket.current.client) return;
    const handleMessage = (e: MessageEvent) => {
      if (e.data !== 'PONG') {
        const data = JSON.parse(e.data);
        if (data.type === 'hint_question') {
          if (
            data.questionId === question.id &&
            data.hintType === HINTS.stats
          ) {
            setStatsHint(data);
          } else {
            setStatsHint(null);
          }
        }
      }
    };
    socket.current.client.addEventListener('message', handleMessage);

    return () => {
      socket.current.client?.removeEventListener('message', handleMessage);
    };
  }, [question.id, socket]);

  const handleClick = () => {
    if (
      (question?.state === QUESTION_STATE.default ||
        question?.state === QUESTION_STATE.alert) &&
      question.isEligible
    ) {
      dispatch((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          selectedChoice: choice?.id,
        },
      }));

      socket.current.client?.send(
        JSON.stringify({
          command: 'ANSWER',
          args: {
            questionId: question.id,
            selectedChoiceId: choice.id,
          },
        }),
      );
      if (timeHintSpecificForThisQuestion && question?.selectedChoice) {
        socket.current.client?.send(
          JSON.stringify({
            command: 'GET_HINT',
            args: {
              questionId: question?.id,
              hintType: HINTS.time,
              hintId: String(timeHintSpecificForThisQuestion.dbId),
              selectedChoiceId: question?.selectedChoice,
            },
          }),
        );
      }
    }
  };

  const showStatsHint = useMemo(
    () =>
      hints.usedHints.find(
        (item) =>
          item.hintType === HINTS.stats && item.questionId === question?.id,
      ),
    [question, hints.usedHints],
  );
  const variant = useMemo(
    () => ({
      [QUESTION_STATE.default]:
        +question?.selectedChoice === +choice?.id ? 'pressed' : 'default',
      [QUESTION_STATE.freeze]: 'default',
      [QUESTION_STATE.answered]:
        +question?.selectedChoice === +choice?.id &&
        +question?.selectedChoice === question?.correct?.answerId
          ? 'rightAnswer'
          : +question?.selectedChoice === +choice?.id &&
            +question?.selectedChoice !== question?.correct?.answerId
          ? 'wrongAnswer'
          : +question?.correct?.answerId === +choice?.id
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
          minHeight="54px"
          width="full"
          onClick={handleClick}
          isDisabled={
            (question?.state === QUESTION_STATE.freeze &&
              +question?.selectedChoice !== +choice?.id) ||
            (question?.state === QUESTION_STATE.answered &&
              +choice?.id !== question?.correct?.answerId &&
              +question?.selectedChoice !== +choice?.id) ||
            disabledFiftyFiftyHint
          }
          as={motion.button}
          key={question?.state}
          {...buttonProps}
          {...(+question?.selectedChoice === +choice?.id &&
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
                  position: 'absolute',
                  left: '0',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  borderTopRightRadius: !!statsHint ? '8px' : '0',
                  borderBottomRightRadius: !!statsHint ? '8px' : '0',
                  zIndex: -1,
                  height: '100% ',
                  width: 0,
                  background:
                    question?.selectedChoice === choice?.id
                      ? 'rgba(256, 256, 256, 0.2)'
                      : '#6E81EE5C',
                }}
                animate={{ width: `${statsHint?.data[choice.id]}%` }}
              />
              <Text
                fontSize="md"
                color="gray.0"
                position="absolute"
                right="12px"
              >
                {statsHint?.data[choice.id]}%
              </Text>
            </>
          )}
      </AnimatePresence>
    </HStack>
  );
};
