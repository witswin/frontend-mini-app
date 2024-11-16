import { Text, VStack } from "@chakra-ui/react";
import { QuestionCard } from "../components/QuestionCard";
import { AnimatePresence, motion } from "framer-motion";
import { useHints, useHintsDispatch, useQuestionData } from "../hooks";
import { HINTS, QUESTION_STATE } from "@/types";
import { selectedHint } from "../types";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuthorization";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { enrolledCompetition } from "@/globalTypes";
import { axiosClient } from "@/configs/axios";

const HintButton = dynamic(
  import("@/components/HintButtons").then((modules) => modules.HintButton),
  { ssr: false }
);
interface HintContentProps {
  hint: selectedHint;
}
const HintContent = ({ hint }: HintContentProps) => {
  const isDisabled = useHints().usedHints.find(
    (item) => item.hintId === hint.localId
  );

  return <HintButton hint={hint} isDisabled={!!isDisabled} />;
};

export const QuizPage = () => {
  const { question } = useQuestionData();

  const selectedHints = useHints().selectedHints;



  // useEffect(() => {
  //   if (enrolledCompetitions) {
  //     hintDispatch((prev) => ({
  //       ...prev,
  //       selectedHints: enrolledCompetitions?.registeredHints.map(
  //         (hint, index) => ({
  //           id: hint.id,
  //           type: hint.hintType as HINTS,
  //           localId: String(index),
  //         })
  //       ),
  //     }));
  //   }
  // }, [enrolledCompetitions]);

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
            paddingTop: `${question?.number * 8}px`,
            width: "100%",
            paddingBottom: "36px",
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
          {!question.isEligible && (
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
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {question?.state !== QUESTION_STATE.freeze &&
          question?.state !== QUESTION_STATE.rest &&
          question?.state !== QUESTION_STATE.answered && (
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
