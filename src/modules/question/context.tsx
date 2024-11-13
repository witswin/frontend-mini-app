import { QUESTION_STATE } from "@/types";
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
import { axiosClient } from "@/configs/axios";
import { useRouter } from "next/router";
import { quizType } from "@/globalTypes";
import { useQuery } from "@tanstack/react-query";

export const QuestionData = createContext<questionData>(undefined);
export const QuestionDataDispatch =
  createContext<Dispatch<SetStateAction<questionData>>>(undefined);

interface QuestionDataProviderProps extends PropsWithChildren {
  timer: number;
}
export const QuestionDataProvider = ({
  children,
  timer,
}: QuestionDataProviderProps) => {
  const { query, push } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });

  const counter = useCounter();
  const counterDispatch = useCounterDispatch();
  const [state, setState] = useState<questionData>({
    quiz: data,
    question: null,
    quizStats: null,
  });

  console.log({ counter });

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date().getTime() > new Date(state.quiz.startAt).getTime()) {
        counterDispatch((prev) => {
          if (prev - 1 > 0) {
            return prev - 1;
          }
          return 0;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state.quiz.startAt]);

  useEffect(() => {
    if (counter === 0) {
      const freezeTimeOut = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.answered,
            timer: counter,
          },
        }));
        return () => {
          clearTimeout(freezeTimeOut);
        };
      }, 3000);
    }
  }, [counter]);

  // add freeze state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (state?.question?.state === QUESTION_STATE.answered) {
      if (state.question.number !== state.quiz.questions.length) {
        timeout = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            question: {
              ...prev.question,
              timer: counter,
              state: QUESTION_STATE.rest,
            },
          }));
        }, 1000);
      } else {
        timeout = setTimeout(() => {
          push(`/quiz/${query.id}/result`);
        }, 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [counter, state.question]);

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   if (
  //     state.question.state === QUESTION_STATE.rest &&
  //     state.question.id !== state.quiz.questions.length - 1
  //   ) {
  //     timeout = setTimeout(() => {

  //     }, 5000);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [counter, state.question]);

  useEffect(() => {
    counterDispatch(timer);
    console.log("render");
  }, [state?.question?.id]);

  useEffect(() => {
    if (state?.question?.state !== QUESTION_STATE.answered) {
      if (counter === 0) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            timer: counter,
            state: QUESTION_STATE.freeze,
          },
        }));
      } else if (counter > 3) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            timer: counter,
            state: QUESTION_STATE.default,
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            timer: counter,
            state: QUESTION_STATE.alert,
          },
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
    selectedHints: [],
  });

  return (
    <Hint.Provider value={state}>
      <HintDispatch.Provider value={setState}>{children}</HintDispatch.Provider>
    </Hint.Provider>
  );
};

export const Counter = createContext(undefined);
export const CounterDispatch =
  createContext<Dispatch<SetStateAction<number>>>(undefined);

interface CounterProviderProps extends PropsWithChildren {
  timer: number;
}
export const CounterProvider = ({ children, timer }: CounterProviderProps) => {
  const [state, setState] = useState(timer);
  return (
    <Counter.Provider value={state}>
      <CounterDispatch.Provider value={setState}>
        {children}
      </CounterDispatch.Provider>
    </Counter.Provider>
  );
};
