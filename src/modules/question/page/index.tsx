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
    CARD_STATE.join | CARD_STATE.lobby | CARD_STATE.watch
  >(CARD_STATE.lobby);

  const [quizContentMode, setQuizContentMode] = useState("timer");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setState(CARD_STATE.lobby);
  //   }, 5000);
  // }, []);

  const { quizStartDate } = useQuestionData();

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.abs(new Date().getTime() - quizStartDate) > 5000 &&
        pageState !== CARD_STATE.lobby
      ) {
        setPageState(CARD_STATE.lobby);
      }
      if (
        Math.abs(new Date().getTime() - quizStartDate) <= 5000 &&
        quizContentMode !== "timer"
      ) {
        setPageState(CARD_STATE.join);
        setQuizContentMode("timer");
      }
      if (new Date().getTime() > quizStartDate && quizContentMode !== "quiz") {
        setPageState(CARD_STATE.join);
        setQuizContentMode("timer");
      }
    }, 1000);
    clearInterval(interval);
  }, []);

  const content = useMemo(
    () => ({
      lobby: <Lobby />,
      join: (
        <AnimatePresence>
          {quizContentMode==="timer" ? (
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
              <QuizTimerScreen count={5} />
            </motion.div>
          ) : (
            <AnimatePresence>
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
                <QuizPage />
              </motion.div>
            </AnimatePresence>
          )}
        </AnimatePresence>
      ),
      watch: <div>sdasd</div>,
    }),
    [quizStartDate]
  );

  return (
    <>
      {pageState !== CARD_STATE.lobby && <TopNavbar />}
      <VStack px="16px" height="full" width="full">
        <AnimatePresence mode="sync">
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
