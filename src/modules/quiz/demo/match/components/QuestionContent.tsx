import { VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUESTION_STATE } from '@/types';
import { useDemoQuizData } from '../hooks';
import { QuestionCard } from './QuestionCard';
import { HintButton } from './HintButtons';

const HintContent = () => {
  const isDisabled = useDemoQuizData().builtInHints[0].isUsed;

  return <HintButton isDisabled={!!isDisabled} />;
};

export const QuizPage = () => {
  const { question, activeQuestionId } = useDemoQuizData();

  const activeQuestion = question.find((item) => item.id === activeQuestionId);


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
      <AnimatePresence mode="popLayout">
        <motion.div
          // key={question?.id}
          style={{
            paddingTop: `${activeQuestion?.number * 8}px`,
            width: '100%',
            paddingBottom: '36px',
            marginBottom: '40px',
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
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {activeQuestion?.state !== QUESTION_STATE.freeze &&
          activeQuestion?.state !== QUESTION_STATE.rest &&
          activeQuestion?.state !== QUESTION_STATE.answered && (
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
              <HintContent />
            </motion.div>
          )}
      </AnimatePresence>
    </VStack>
  );
};
