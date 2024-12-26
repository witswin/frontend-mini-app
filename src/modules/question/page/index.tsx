/* eslint-disable @typescript-eslint/no-explicit-any */
import { VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_STATE, QUESTION_STATE } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { QuizTimerScreen } from "../components/QuizTimerScreen ";
import { TopNavbar } from "../components/TopNavbar";
import { QuizPage } from "../components/QuestionContent";
import {
  useCounterDispatch,
  useQuestionData,
  useQuestionDataDispatch,
} from "../hooks";
import { useWebSocket } from "@/hooks/useWebSocket";
import { choice } from "@/globalTypes";
import { shuffleArray } from "@/utils";
import dynamic from "next/dynamic";
import { calculatePreTimer } from "../context";

const Lobby = dynamic(
  () => import("../components/Lobby").then((modules) => modules.Lobby),
  { ssr: false }
);

export const Question = () => {
  const [pageState, setPageState] = useState<
    CARD_STATE.join | CARD_STATE.lobby
  >(CARD_STATE.lobby);

  const [quizContentMode, setQuizContentMode] = useState("timer");

  const { quiz, question } = useQuestionData();
  const setCounter = useCounterDispatch();
  const dispatch = useQuestionDataDispatch();

  const { socket } = useWebSocket();

  // useEffect(() => {
  //   setInterval(() => {
  //     if (
  //       question === null &&
  //       new Date(quiz.startAt).getTime() <= new Date().getTime()
  //     ) {
  //       const secondsRemaining = calculatePreTimer(
  //         new Date(quiz.startAt),
  //         quiz.questionTimeSeconds,
  //         quiz.restTimeSeconds,
  //         question.number
  //       );
  //       setCounter(secondsRemaining);
  //       console.log({ reset: secondsRemaining });
  //     }
  //   }, 1000);
  // }, [question]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (question?.number !== 1) {
  //       const secondsRemaining = calculatePreTimer(
  //         new Date(quiz.startAt),
  //         quiz.questionTimeSeconds,
  //         quiz.restTimeSeconds,
  //         question.number
  //       );
  //       setCounter(secondsRemaining);
  //       console.log({ reset: secondsRemaining });
  //     }
  //   }, 1000);
  // }, [question]);

  useEffect(() => {
    console.log('Quiz Start', new Date(quiz?.startAt).getTime() / 1000);

    if (!socket.current.client) return;
    const handleMessage = (e: MessageEvent) => {
      if (e.data !== "PONG") {
        const data = JSON.parse(e.data);

        if (data.type === "new_question") {
          const secondsRemaining = calculatePreTimer(
            new Date(quiz.startAt),
            quiz.questionTimeSeconds,
            quiz.restTimeSeconds,
            data.question.number
          );
          console.log('New Question', new Date().getTime() / 1000);

          setCounter(secondsRemaining);

          dispatch((prev) => {
            if (prev?.question?.id === data?.question) return prev;

            if (quiz.shuffleAnswers) {
              data.question.choices = shuffleArray(data.question.choices);
            }

            return {
              ...prev,
              question: {
                ...data.question,
                state: QUESTION_STATE.default,
                correct: null,
              },
            };
          });

          const correctAnswer = data?.question?.choices?.find(
            (item: choice) => item.isCorrect
          );

          if (correctAnswer) {
            dispatch((prev) => ({
              ...prev,
              question: { ...prev.question, correct: correctAnswer.id },
            }));
          }
        } else if (data.type === "correct_answer") {
          const answerData = data.data;

          dispatch((prev) => ({
            ...prev,
            question: {
              ...prev.question,
              correct: answerData,
            },
          }));
        } else if (data.type === "quiz_stats") {
          const stats = data.data;

          dispatch((prev) => ({
            ...prev,
            quizStats: stats,
          }));
        }
      }
    };
    socket.current.client.addEventListener("message", handleMessage);

    return () => {
      socket.current.client?.removeEventListener("message", handleMessage);
    };
  }, [socket?.current?.client]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        new Date(quiz.startAt).getTime() - new Date().getTime() >= 6000 &&
        pageState !== CARD_STATE.lobby
      ) {
        setPageState(CARD_STATE.lobby);
      }
      if (new Date(quiz.startAt).getTime() - new Date().getTime() < 6000) {
        setPageState(CARD_STATE.join);
        setQuizContentMode("timer");
      }
      if (new Date(quiz.startAt).getTime() - new Date().getTime() <= -2) {
        setQuizContentMode("quiz");
      }
    }, 300);
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
              transition={{ duration: 0 }}
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
              transition={{ duration: 0 }}
              style={{
                width: "100%",
                position: "relative",
                display: "inline-block",
                height: "100%",
              }}
            >
              {question && <QuizPage />}
            </motion.div>
          )}
        </AnimatePresence>
      ),
    }),
    [quiz.startAt, quizContentMode]
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
            transition={{ duration: 0  }}
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
