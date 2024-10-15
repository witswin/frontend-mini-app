import { QUESTION_STATE } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { questionData } from "./types";

export const QuestionData = createContext<questionData>(undefined);
export const QuestionDataDispatch =
  createContext<Dispatch<SetStateAction<questionData>>>(undefined);

interface QuestionDataProviderProps extends PropsWithChildren {
  timer: number;
}
export const QuestionDataProvider = ({
  children,
  timer = 10,
}: QuestionDataProviderProps) => {
  const [counter, setCounter] = useState(timer);

  const [state, setState] = useState<questionData>({
    activeQuestionId: 0,
    questions: [
      {
        state: QUESTION_STATE.default,
        title: "Q 1",
        timer,
        id: 0,
        correct: 1,
        choices: [
          { id: "0", title: "choice1" },
          { id: "1", title: "choice2" },
          { id: "2", title: "choice3" },
          { id: "3", title: "choice4" },
        ],
      },
      {
        state: QUESTION_STATE.default,
        title: "Q 2",

        timer,
        id: 1,
        correct: 3,
        choices: [
          { id: "0", title: "choice1" },
          { id: "1", title: "choice2" },
          { id: "2", title: "choice3" },
          { id: "3", title: "choice4" },
        ],
      },
      {
        state: QUESTION_STATE.default,
        title: "Q 3",

        timer,
        id: 2,
        correct: 2,
        choices: [
          { id: "0", title: "choice1" },
          { id: "1", title: "choice2" },
          { id: "2", title: "choice3" },
          { id: "3", title: "choice4" },
        ],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev - 1 > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      const activeQuestion = state.questions.find(
        (item) => item.id === state.activeQuestionId
      );
      const filteredQuestions = state.questions.filter(
        (item) => item.id !== state.activeQuestionId
      );
      const freezeTimeOut = setTimeout(() => {
        setState((prev) => ({
          activeQuestionId: prev.activeQuestionId,
          questions: [
            ...filteredQuestions,
            {
              ...activeQuestion,
              timer: counter,
              state: QUESTION_STATE.answered,
            },
          ],
        }));
        return () => {
          clearTimeout(freezeTimeOut);
        };
      }, 3000);
    }
  }, [counter]);

  useEffect(() => {
    const activeQuestion = state.questions.find(
      (item) => item.id === state.activeQuestionId
    );

    let timeout: NodeJS.Timeout;
    if (
      activeQuestion.state === QUESTION_STATE.answered &&
      state.activeQuestionId !== state.questions.length - 1
    ) {
      timeout = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          activeQuestionId: prev.activeQuestionId + 1,
        }));
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [counter, state.activeQuestionId, state.questions]);

  useEffect(() => {
    setCounter(timer);
  }, [state.activeQuestionId]);

  useEffect(() => {
    const activeQuestion = state.questions.find(
      (item) => item.id === state.activeQuestionId
    );
    const filteredQuestions = state.questions.filter(
      (item) => item.id !== state.activeQuestionId
    );
    if (activeQuestion.state !== QUESTION_STATE.answered) {
      if (counter === 0) {
        setState((prev) => ({
          activeQuestionId: prev.activeQuestionId,
          questions: [
            ...filteredQuestions,
            {
              ...activeQuestion,
              timer: counter,
              state: QUESTION_STATE.freeze,
            },
          ],
        }));
      } else if (counter > 3) {
        setState((prev) => ({
          activeQuestionId: prev.activeQuestionId,
          questions: [
            ...filteredQuestions,
            {
              ...activeQuestion,
              timer: counter,
              state: QUESTION_STATE.default,
            },
          ],
        }));
      } else {
        setState((prev) => ({
          activeQuestionId: prev.activeQuestionId,
          questions: [
            ...filteredQuestions,
            {
              ...activeQuestion,
              timer: counter,
              state: QUESTION_STATE.alert,
            },
          ],
        }));
      }
    }
  }, [counter]);

  return (
    <QuestionData.Provider value={state}>
      <QuestionDataDispatch.Provider value={setState}>
        {children}
      </QuestionDataDispatch.Provider>
    </QuestionData.Provider>
  );
};
