import { VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_STATE } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Lobby } from "../components/Lobby";
import { QuizTimerScreen } from "../components/QuizTimerScreen ";
import { TopNavbar } from "../components/TopNavbar";
import { QuizPage } from "../components/QuestionContent";
import { useQuestionData } from "../hooks";

export const Question = () => {
  const [pageState, setPageState] = useState<
    CARD_STATE.join | CARD_STATE.lobby
  >(CARD_STATE.lobby);

  const [quizContentMode, setQuizContentMode] = useState("timer");

  const { quizStartDate } = useQuestionData();

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        quizStartDate - new Date().getTime() >= 6000 &&
        pageState !== CARD_STATE.lobby
      ) {
        setPageState(CARD_STATE.lobby);
      }
      if (quizStartDate - new Date().getTime() <= 5000) {
        setPageState(CARD_STATE.join);
        setQuizContentMode("timer");
      }
      if (quizStartDate - new Date().getTime() <= -2) {
        setQuizContentMode("quiz");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const content = useMemo(
    () => ({
      lobby: <Lobby />,
      join: (
        <AnimatePresence mode="wait">
          {quizContentMode === "timer" ? (
            <motion.div
              key="timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                position: "relative",
                display: "inline-block",
                height: "100%",
              }}
            >
              <QuizTimerScreen count={5} />
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                position: "relative",
                display: "inline-block",
                height: "100%",
              }}
            >
              <QuizPage />
            </motion.div>
          )}
        </AnimatePresence>
      ),
    }),
    [quizStartDate, quizContentMode]
  );

  return (
    <>
      {pageState !== CARD_STATE.lobby && <TopNavbar />}
      <VStack px="16px" height="full" width="full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              width: "100%",
              position: "relative",
              display: "inline-block",
              height: "100%",
            }}
          >
            {content[pageState]}
          </motion.div>
        </AnimatePresence>
      </VStack>
    </>
  );
};
