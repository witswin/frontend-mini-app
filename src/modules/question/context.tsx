import { HINTS, QUESTION_STATE } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { hint, questionData } from "./types";
import { useCounter, useCounterDispatch } from "./hooks";

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
  const counter = useCounter();
  const counterDispatch = useCounterDispatch();
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
          { id: "0", title: "choice1", stats: "25" },
          { id: "1", title: "choice2", stats: "25" },
          { id: "2", title: "choice3", stats: "25" },
          { id: "3", title: "choice4", stats: "25" },
        ],
      },
      {
        state: QUESTION_STATE.default,
        title: "Q 2",

        timer,
        id: 1,
        correct: 3,
        choices: [
          { id: "0", title: "choice1", stats: "25" },
          { id: "1", title: "choice2", stats: "25" },
          { id: "2", title: "choice3", stats: "25" },
          { id: "3", title: "choice4", stats: "25" },
        ],
      },
      {
        state: QUESTION_STATE.default,
        title: "Q 3",

        timer,
        id: 2,
        correct: 2,
        choices: [
          { id: "0", title: "choice1", stats: "25" },
          { id: "1", title: "choice2", stats: "25" },
          { id: "2", title: "choice3", stats: "25" },
          { id: "3", title: "choice4", stats: "25" },
        ],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      counterDispatch((prev) => {
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
    counterDispatch(timer);
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

export const Hint = createContext<hint>(undefined);
export const HintDispatch =
  createContext<Dispatch<SetStateAction<hint>>>(undefined);

interface HintProviderProps extends PropsWithChildren {}

export const HintProvider = ({ children }: HintProviderProps) => {
  const [state, setState] = useState<hint>({
    usedHints: [],
    selectedHints: [HINTS.extraTime, HINTS.fiftyFifty],
  });

  return (
    <Hint.Provider value={state}>
      <HintDispatch.Provider value={setState}>{children}</HintDispatch.Provider>
    </Hint.Provider>
  );
};

export const Counter = createContext(10);
export const CounterDispatch =
  createContext<Dispatch<SetStateAction<number>>>(undefined);

interface CounterProviderProps extends PropsWithChildren {}
export const CounterProvider = ({ children }: CounterProviderProps) => {
  const [state, setState] = useState(10);
  return (
    <Counter.Provider value={state}>
      <CounterDispatch.Provider value={setState}>
        {children}
      </CounterDispatch.Provider>
    </Counter.Provider>
  );
};