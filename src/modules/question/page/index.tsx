/* eslint-disable @typescript-eslint/no-explicit-any */
import { VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_STATE, HINTS, QUESTION_STATE } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { QuizTimerScreen } from "../components/QuizTimerScreen ";
import { TopNavbar } from "../components/TopNavbar";
import { QuizPage } from "../components/QuestionContent";
import {
  useHints,
  useHintsDispatch,
  useQuestionData,
  useQuestionDataDispatch,
} from "../hooks";
import { useWebSocket } from "@/hooks/useWebSocket";
import { choice, enrolledCompetition } from "@/globalTypes";
import { shuffleArray } from "@/utils";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuthorization";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axiosClient } from "@/configs/axios";

const Lobby = dynamic(
  () => import("../components/Lobby").then((modules) => modules.Lobby),
  { ssr: false }
);

export const Question = () => {
  const [pageState, setPageState] = useState<
    CARD_STATE.join | CARD_STATE.lobby
  >(CARD_STATE.lobby);

  const [quizContentMode, setQuizContentMode] = useState("timer");

  const hintDispatch = useHintsDispatch();
  const hints = useHints();

  const { quiz, question } = useQuestionData();
  const dispatch = useQuestionDataDispatch();

  const { socket } = useWebSocket();

  const authInfo = useAuth();
  const { query } = useRouter();
  const { data: enrolledCompetitions, isSuccess } = useQuery({
    queryKey: ["enrolledCompetition", authInfo?.token, , query?.id],
    queryFn: async () =>
      await axiosClient
        .get<string, AxiosResponse<enrolledCompetition[]>>(
          `/quiz/competitions/enroll?competition_pk=${query?.id}`,
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          }
        )
        .then((res) => {
          hintDispatch((prev) => ({
            ...prev,
            selectedHints: res.data[0]?.registeredHints.map((hint, index) => ({
              id: hint.id,
              type: hint.hintType as HINTS,
              localId: String(index),
            })),
          }));
        }),
    enabled: !!authInfo?.token,
  });

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

  console.log({ enrolledCompetitions });

  useEffect(() => {
    if (isSuccess) {
      socket.current.client.onmessage = (e: any) => {
        console.log({ e: e.data });
        if (e.data !== "PONG") {
          const data = JSON.parse(e.data);

          if (data.type === "new_question") {
            dispatch((prev) => {
              if (prev?.question?.id === data?.question) return prev;

              if (quiz.shuffleAnswers) {
                data.question.choices = shuffleArray(data.question.choices);
              }
              console.log("render");

              return {
                ...prev,
                question: {
                  ...data.question,
                  state: QUESTION_STATE.default,
                  timer: quiz.questionTimeSeconds,
                  correct: null,
                },
              };
            });

            const correctAnswer = data.question.choices.find(
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
          }
          //  else if (data.type === "add_answer") {
          //   const answerData = data.data;
          //   setAnswersHistory((answerHistory) => {
          //     answerHistory[answerData.questionNumber - 1] =
          //       answerData.correctChoice;
          //     return [...answerHistory];
          //   });
          // }
          else if (data.type === "quiz_stats") {
            const stats = data.data;

            dispatch((prev) => ({
              ...prev,
              quizStats: stats,
            }));
          }
          // else if (data.type === "quiz_finish") {
          //   setWinnersList(data.winnersList);
          // } else if (data.type === "hint_question") {
          //   setHint((prev) => prev - 1);
          //   setHintData({
          //     data: data.data,
          //     questionId: data.questionId,
          //     hintType: data.hintType,
          //   });
          //   const hint = userCompetition.registeredHints.findIndex(
          //     (item) => item.id === data.hintId
          //   );

          //   if (hint !== -1) {
          //     userCompetition.registeredHints.splice(hint, 1);
          //     setUserCompetition({ ...userCompetition });
          //   }
          // } else if (data.type === "answers_history") {
          //   const answers =
          //     typeof data.data === "string" ? JSON.parse(data.data) : data.data;

          //   setAnswersHistory(
          //     answers.map((item: any) =>
          //       item.selectedChoice?.isCorrect ? item.selectedChoice.id : -1
          //     )
          //   );
          //   setUserAnswersHistory(
          //     answers.map(
          //       (item: { selectedChoice: Choice }) => item.selectedChoice?.id
          //     )
          //   );
          // }
        }
      };
    }
  }, [
    dispatch,
    quiz.questionTimeSeconds,
    quiz.shuffleAnswers,
    socket,
    isSuccess,
  ]);

  console.log({ socket: question });

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
      if (
        new Date(quiz.startAt).getTime() - new Date().getTime() <= -2 &&
        quizContentMode !== "quiz"
      ) {
        setQuizContentMode("quiz");
        clearInterval(interval);
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
