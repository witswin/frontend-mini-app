import { Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { QuestionCard } from '../components/QuestionCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useHints, useQuestionData } from '../hooks';
import { QUESTION_STATE } from '@/types';
import { HintButton } from '@/components/HintButtons';
import { selectedHint } from '../types';
import { useEffect, useState } from 'react';
import { GameOverModal } from './GameOverModal';
import { useCheckEnrolled } from '@/modules/home/hooks';

interface HintContentProps {
  hint: selectedHint;
}
const HintContent = ({ hint }: HintContentProps) => {
  const isDisabled = useHints().usedHints.find(
    (item) => item.hintId === hint.localId,
  );

  return <HintButton hint={hint} isDisabled={!!isDisabled} />;
};

export const QuizPage = () => {
  const { question } = useQuestionData();

  const selectedHints = useHints().selectedHints;
  const checkIsEnrolled = useCheckEnrolled();

  const isEnrolled = checkIsEnrolled(question?.competition);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isShowedBefore, setIsShowedBefore] = useState(false);
  useEffect(() => {
    if (question?.correct) {
      if (
        question?.selectedChoice !== +question?.correct?.answerId &&
        !isShowedBefore &&
        isEnrolled &&
        question?.isEligible
      ) {
        onOpen();
        setIsShowedBefore(true);
      }
    }
  }, [question?.correct, question?.selectedChoice, isEnrolled]);

  return (
    <VStack height="full" position="relative" width="full">
      {/* {questions.map((item, index, array) => (
        <Box
          zIndex={-1}
          position="absolute"
          top={`${index * 8}px`}
          left="50%"
          transform="translateX(-50%)"
          width={`calc(100% - ${(array.length - index) * 20}px)`}
          key={item.id}
        >
          <Card height="full" minH="200px">
            <Box filter="blur(4px)" width="full">
              <QuestionBanner content={activeQuestion.title} /> 
              <ProgressTimer
                timer={0}
                state={QUESTION_STATE.default}
                hasCounter
                hasIcon
              />
              {activeQuestion.choices.map((choice) => (
                <ChoiceButton
                  setSelectedChoice={undefined}
                  selectedChoice={undefined}
                  key={choice.id}
                  buttonInfo={choice}
                />
              ))}
              <Text color="gray.200" fontSize="xs">
                By Adams Sandler
              </Text>
            </Box>
          </Card>
        </Box>
      ))} */}
      {!!question?.id ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            // key={question?.id}
            style={{
              paddingTop: `${question?.number * 8}px`,
              width: '100%',
              paddingBottom: '36px',
              marginBottom: '16px',
            }}
            // initial={{
            //   opacity: 0,
            //   scale: 0,
            // }}
            // animate={{
            //   scale: 1,
            //   opacity: 1,
            // }}
            // exit={{
            //   scale: 0,
            //   opacity: 0,
            // }}
            // transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <QuestionCard />
            <GameOverModal isOpen={isOpen} onClose={onClose} />

            {!question.isEligible && (
              <Text
                mt="8px !important"
                backgroundClip="text"
                background="glassBackground"
                sx={{
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                }}
                textAlign="center"
                fontSize="24px"
                fontWeight="700"
                fontFamily="Kanit"
                width="full"
              >
                Spectator Mode
              </Text>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <Spinner color="cyan" size="md" />
      )}
      <AnimatePresence>
        {question?.state !== QUESTION_STATE.freeze &&
          question?.state !== QUESTION_STATE.rest &&
          question?.state !== QUESTION_STATE.answered &&
          question?.isEligible && (
            <motion.div
              initial={{
                y: 200,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 200,
                opacity: 0,
              }}
              style={{
                width: 'calc(100% - 32px)',
                maxWidth: 'calc(538px - 32px)',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '8px',
                position: 'fixed',
                bottom: '16px',
              }}
            >
              {selectedHints.map((item) => (
                <HintContent hint={item} key={item.id} />
              ))}
            </motion.div>
          )}
      </AnimatePresence>
    </VStack>
  );
};
