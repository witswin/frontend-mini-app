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
    state: QUESTION_STATE.default,
    timer,
    question: {
      id: 0,
      correct: 1,
      choices: [
        { id: "0", title: "choice1" },
        { id: "1", title: "choice2" },
        { id: "2", title: "choice3" },
        { id: "3", title: "choice4" },
      ],
    },
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
      const freezeTimeOut = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          state: QUESTION_STATE.answered,
        }));
        return () => {
          clearTimeout(freezeTimeOut);
        };
      }, 3000);
    }
  }, [counter]);

  useEffect(() => {
    if (state.state !== QUESTION_STATE.answered) {
      if (counter === 0) {
        setState((prev) => ({
          ...prev,
          timer: counter,
          state: QUESTION_STATE.freeze,
        }));
      } else if (counter > 3) {
        setState((prev) => ({
          ...prev,
          timer: counter,
          state: QUESTION_STATE.default,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          timer: counter,
          state: QUESTION_STATE.alert,
        }));
      }
    }
  }, [counter, state.state]);

  return (
    <QuestionData.Provider value={state}>
      <QuestionDataDispatch.Provider value={setState}>
        {children}
      </QuestionDataDispatch.Provider>
    </QuestionData.Provider>
  );
};
