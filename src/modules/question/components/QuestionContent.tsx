import { Box, Text, VStack } from "@chakra-ui/react";
import { QuestionCard } from "../components/QuestionCard";
import { Card } from "@/components/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useHints, useQuestionData } from "../hooks";
import { QuestionBanner } from "../components/QuestionBanner";
import { QUESTION_STATE } from "@/types";
import { ChoiceButton } from "@/components/ChoiceButton";
import { ProgressTimer } from "@/components/ProgressTimer";
import { HintButton } from "@/components/HintButtons";
import { selectedHint } from "../types";

interface HintContentProps {
  hint: selectedHint;
}
const HintContent = ({ hint }: HintContentProps) => {
  const isDisabled = useHints().usedHints.find(
    (item) => item.hintId === hint.id
  );

  return <HintButton hint={hint} isDisabled={!!isDisabled} />;
};

export const QuizPage = () => {
  const { questions, activeQuestionId } = useQuestionData();
  const activeQuestion = questions.find((item) => item.id === activeQuestionId);

  const selectedHints = useHints().selectedHints;
  return (
    <VStack height="full" position="relative" width="full">
      {questions.map((item, index, array) => (
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
      ))}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeQuestion.id}
          style={{
            paddingTop: `${questions.length * 8}px`,
            width: "100%",
            paddingBottom: "36px",
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            y: 500,
            opacity: 0,
          }}
          transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <QuestionCard />
          <Text
            mt="8px !important"
            backgroundClip="text"
            background="glassBackground"
            sx={{
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
            textAlign="center"
            fontSize="24px"
            fontWeight="700"
            fontFamily="Kanit"
            width="full"
          >
            Spectator Mode
          </Text>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {activeQuestion.state !== QUESTION_STATE.freeze &&
          activeQuestion.state !== QUESTION_STATE.rest &&
          activeQuestion.state !== QUESTION_STATE.answered && (
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
                position: "sticky",
                bottom: "0",
                left: "0",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                columnGap: "8px",
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
