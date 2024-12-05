import { demoQuizData } from '@/constants';
import { demoQuizType } from '@/globalTypes';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDemoQuizCounter, useDemoQuizCounterDispatch } from './hooks';
import { QUESTION_STATE } from '@/types';
import { useRouter } from 'next/router';

export const DemoQuizData = createContext<demoQuizType>(demoQuizData);
export const DemoQuizDispatch =
  createContext<Dispatch<SetStateAction<demoQuizType>>>(undefined);

interface DemoQuizProviderProps extends PropsWithChildren {}
export const DemoQuizProvider = ({ children }: DemoQuizProviderProps) => {
  const { push } = useRouter();
  const [state, setState] = useState<demoQuizType>(demoQuizData);

  const counter = useDemoQuizCounter();
  const counterDispatch = useDemoQuizCounterDispatch();

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
  }, [state?.activeQuestionId]);

  useEffect(() => {
    const activeQuestion = state.question.find(
      (item) => item.id === state.activeQuestionId,
    );
    let timeout: NodeJS.Timeout;
    if (
      activeQuestion.state === QUESTION_STATE.rest &&
      counter === 0 &&
      state.activeQuestionId !== state.question.length - 1
    ) {
      timeout = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          activeQuestionId: prev.activeQuestionId + 1,
        }));
        counterDispatch(state.questionTimeSeconds);
      }, state.restTimeSeconds * 1000 - 3000);
    }
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    const activeQuestion = state.question.find(
      (item) => item.id === state.activeQuestionId,
    );
    if (activeQuestion.state === QUESTION_STATE.freeze) {
      const freezeTimeOut = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          question: state.question.map((item) => {
            if (item.id === state.activeQuestionId) {
              return { ...item, state: QUESTION_STATE.answered };
            } else {
              return item;
            }
          }),
        }));
        return () => {
          clearTimeout(freezeTimeOut);
        };
      }, 3000);
    }
  }, [state.activeQuestionId, state.question]);

  // add freeze state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const activeQuestion = state.question.find(
      (item) => item.id === state.activeQuestionId,
    );
    if (activeQuestion.state === QUESTION_STATE.answered) {
      if (activeQuestion.id !== state.question.length - 1) {
        timeout = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            question: state.question.map((item) => {
              if (item.id === state.activeQuestionId) {
                return { ...item, state: QUESTION_STATE.rest };
              } else {
                return item;
              }
            }),
          }));
        }, 1000);
      } else {
        timeout = setTimeout(() => {
          push(`/quiz/demo/result`);
        }, 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [state.question.length, state.activeQuestionId, state.question]);

  useEffect(() => {
    const activeQuestion = state.question.find(
      (item) => item.id === state.activeQuestionId,
    );

    if (activeQuestion.state !== QUESTION_STATE.answered) {
      if (
        counter === 0 &&
        activeQuestion.state !== QUESTION_STATE.freeze &&
        activeQuestion.state !== QUESTION_STATE.rest
      ) {
        setState((prev) => ({
          ...prev,
          question: state.question.map((item) => {
            if (item.id === state.activeQuestionId) {
              return { ...item, state: QUESTION_STATE.freeze };
            } else {
              return item;
            }
          }),
        }));
      } else if (
        counter > 3 &&
        activeQuestion?.state !== QUESTION_STATE.default
      ) {
        setState((prev) => ({
          ...prev,
          question: state.question.map((item) => {
            if (item.id === state.activeQuestionId) {
              return { ...item, state: QUESTION_STATE.default };
            } else {
              return item;
            }
          }),
        }));
      } else if (
        counter <= 3 &&
        counter > 0 &&
        activeQuestion?.state !== QUESTION_STATE.alert
      ) {
        setState((prev) => ({
          ...prev,
          question: state.question.map((item) => {
            if (item.id === state.activeQuestionId) {
              return { ...item, state: QUESTION_STATE.alert };
            } else {
              return item;
            }
          }),
        }));
      }
    }
  }, [counter, state.activeQuestionId, state.question]);

  return (
    <DemoQuizData.Provider value={state}>
      <DemoQuizDispatch.Provider value={setState}>
        {children}
      </DemoQuizDispatch.Provider>
    </DemoQuizData.Provider>
  );
};

export const DemoQuizCounter = createContext(13);
export const DemoQuizCounterDispatch =
  createContext<Dispatch<SetStateAction<number>>>(undefined);

interface DemoQuizCounterProviderProps extends PropsWithChildren {}
export const DemoQuizCounterProvider = ({
  children,
}: DemoQuizCounterProviderProps) => {
  const [state, setState] = useState(demoQuizData.questionTimeSeconds);
  return (
    <DemoQuizCounter.Provider value={state}>
      <DemoQuizCounterDispatch.Provider value={setState}>
        {children}
      </DemoQuizCounterDispatch.Provider>
    </DemoQuizCounter.Provider>
  );
};
