import { VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_STATE, QUESTION_STATE } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Lobby } from "../components/Lobby";
import { QuizTimerScreen } from "../components/QuizTimerScreen ";
import { TopNavbar } from "../components/TopNavbar";
import { QuizPage } from "../components/QuestionContent";
import { useQuestionData, useQuestionDataDispatch } from "../hooks";
import { useAuth } from "@/hooks/useAuthorization";
import { shuffleArray } from "@/utils";
import { choice } from "@/globalTypes";

export const Question = () => {
  const [pageState, setPageState] = useState<
    CARD_STATE.join | CARD_STATE.lobby
  >(CARD_STATE.lobby);

  const authInfo = useAuth();
  const [quizContentMode, setQuizContentMode] = useState("timer");

  const { quiz, question } = useQuestionData();
  const dispatch = useQuestionDataDispatch();
  const [ping, setPing] = useState(-1);

  const socket = useRef({ client: null as WebSocket | null });

  console.log({ question });

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        new Date(quiz.startAt).getTime() - new Date().getTime() >= 6000 &&
        pageState !== CARD_STATE.lobby
      ) {
        setPageState(CARD_STATE.lobby);
      }
      if (new Date(quiz.startAt).getTime() - new Date().getTime() <= 5000) {
        setPageState(CARD_STATE.join);
        setQuizContentMode("timer");
      }
      if (new Date(quiz.startAt).getTime() - new Date().getTime() <= -2) {
        setQuizContentMode("quiz");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    let interval: NodeJS.Timeout | undefined;
    let reconnectTimeout: NodeJS.Timeout | undefined;
    let previousPing: Date | null = null;

    const initializeWebSocket = () => {
      if (!isMounted) return;

      let socketUrl =
        process.env.NEXT_PUBLIC_WS_URL! + "/ws/quiz/" + quiz.id + "/";

      if (authInfo) socketUrl += `?auth=${authInfo.token}`;

      socket.current.client = new WebSocket(socketUrl);

      socket.current.client.onopen = () => {
        previousPing = new Date();
        socket.current.client?.send(JSON.stringify({ command: "PING" }));
        interval = setInterval(() => {
          try {
            previousPing = new Date();
            socket.current.client?.send(JSON.stringify({ command: "PING" }));
          } catch (error) {
            reconnect();
            console.log(error);
          }
        }, 3000);
      };

      socket.current.client.onclose = () => {
        if (isMounted) reconnect();
        setPing(-1);
      };

      socket.current.client.onmessage = (e) => {
        if (e.data === "PONG") {
          const now = new Date();
          const timePassed = previousPing
            ? now.getTime() - previousPing.getTime()
            : -1;
          setPing(timePassed);
        } else {
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
          }
          //  else if (data.type === "add_answer") {
          //   const answerData = data.data;
          //   setAnswersHistory((answerHistory) => {
          //     answerHistory[answerData.questionNumber - 1] =
          //       answerData.correctChoice;
          //     return [...answerHistory];
          //   });
          // } else if (data.type === "correct_answer") {
          //   const answerData = data.data;

          //   setAnswersHistory((answerHistory) => {
          //     answerHistory[answerData.questionNumber - 1] =
          //       answerData.answerId;

          //     return [...answerHistory];
          //   });
          // } else if (data.type === "quiz_stats") {
          //   const stats = data.data;

          //   setHint(stats.hintCount);
          //   setPreviousRoundLosses(stats.previousRoundLosses);
          //   setAmountWinPerUser(stats.prizeToWin);
          //   setTotalParticipantsCount(stats.totalParticipantsCount);
          //   setRemainingPeople(stats.usersParticipating);
          // } else if (data.type === "quiz_finish") {
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
    };

    const reconnect = () => {
      if (interval) clearInterval(interval); // Clear the existing interval before reconnecting
      if (reconnectTimeout) clearTimeout(reconnectTimeout); // Clear the existing timeout before setting a new one
      if (socket.current.client) {
        socket.current.client.onclose = () => {}; // Prevent the original onclose from firing during reconnect
        socket.current.client.close();
        socket.current.client = null;
      }

      reconnectTimeout = setTimeout(() => {
        if (isMounted) {
          initializeWebSocket();
        }
      }, 5000); // Wait 5 seconds before attempting to reconnect
    };

    initializeWebSocket(); // Initialize the WebSocket connection

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval); // Clean up the interval
      if (reconnectTimeout) clearTimeout(reconnectTimeout); // Clean up the reconnect timeout
      if (socket.current.client) {
        socket.current.client.onclose = () => {}; // Prevent the onclose from firing during cleanup
        socket.current.client.close();
        socket.current.client = null;
      }
    };
  }, [authInfo]);

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
