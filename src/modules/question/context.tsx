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
import { axiosClient } from "@/configs/axios";
import { useRouter } from "next/router";
import { enrolledCompetition, quizType } from "@/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useAuth } from "@/hooks/useAuthorization";

export const QuestionData = createContext<questionData>(undefined);
export const QuestionDataDispatch =
  createContext<Dispatch<SetStateAction<questionData>>>(undefined);

interface QuestionDataProviderProps extends PropsWithChildren {}
export const QuestionDataProvider = ({
  children,
}: QuestionDataProviderProps) => {
  const { query, push } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });

  // const counter = useCounter();
  const [state, setState] = useState<questionData>({
    quiz: data,
    question: null,
    quizStats: null,
  });
  const counter = useCounter();
  const counterDispatch = useCounterDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state?.question && counter !== 0) {
      interval = setInterval(() => {
        counterDispatch((prev) => {
          if (prev - 1 > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state?.question?.id]);

  console.log(state?.question?.state);

  useEffect(() => {
    if (state?.question?.state === QUESTION_STATE.freeze) {
      const freezeTimeOut = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.answered,
          },
        }));
        return () => {
          clearTimeout(freezeTimeOut);
        };
      }, 3000);
    }
  }, [state?.question?.state]);

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
  }, [state.quiz.questions.length, state?.question?.state]);

  useEffect(() => {
    if (state?.question?.state !== QUESTION_STATE.answered) {
      if (
        counter === 0 &&
        state?.question?.state !== QUESTION_STATE.freeze &&
        state?.question?.state !== QUESTION_STATE.rest
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.freeze,
          },
        }));
      } else if (
        counter > 3 &&
        state?.question?.state !== QUESTION_STATE.default
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.default,
          },
        }));
      } else if (
        counter <= 3 &&
        counter > 0 &&
        state?.question?.state !== QUESTION_STATE.alert
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.alert,
          },
        }));
      }
    }
  }, [counter, state.question]);

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

  const authInfo = useAuth();
  const { query } = useRouter();
  const { data: enrolledCompetitions } = useQuery({
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
        .then((res) => res.data[0]),
    enabled: !!authInfo?.token,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      selectedHints:
        enrolledCompetitions?.registeredHints.map((hint, index) => ({
          id: hint.id,
          type: hint.hintType as HINTS,
          localId: String(index),
        })) ?? [],
    }));
  }, [enrolledCompetitions]);

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
  restTimeSeconds: number;
  startAt: string;
}

export const calculatePreTimer = (
  startAt: Date,
  questionTimeSeconds: number,
  restTimeSeconds: number,
  number?: number
) => {
  const timePassedSeconds = (new Date().getTime() - startAt.getTime()) / 1000;

  const questionTimePeriod = questionTimeSeconds + restTimeSeconds;

  if (!number) {
    return Math.min(
      questionTimeSeconds,
      +(
        questionTimeSeconds -
        ((timePassedSeconds % questionTimePeriod) - restTimeSeconds)
      ).toFixed(0)
    );
  }
  const questionStartTime =
    startAt.getTime() / 1000 +
    (questionTimeSeconds + restTimeSeconds) * (number - 1);
  return Math.min(
    questionTimeSeconds,
    Math.abs(questionStartTime - new Date().getTime() / 1000 + restTimeSeconds)
  );
};

export const CounterProvider = ({
  children,
  timer,
  restTimeSeconds,
  startAt,
}: CounterProviderProps) => {
  const [state, setState] = useState(
    calculatePreTimer(new Date(startAt), timer, restTimeSeconds)
  );

  return (
    <Counter.Provider value={state}>
      <CounterDispatch.Provider value={setState}>
        {children}
      </CounterDispatch.Provider>
    </Counter.Provider>
  );
};
