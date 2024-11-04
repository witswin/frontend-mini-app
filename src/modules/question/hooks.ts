import { useContext } from "react";
import {
  Counter,
  CounterDispatch,
  Hint,
  HintDispatch,
  QuestionData,
  QuestionDataDispatch,
} from "./context";

export const useQuestionData = () => useContext(QuestionData);
export const useQuestionDataDispatch = () => useContext(QuestionDataDispatch);

export const useHints = () => useContext(Hint);
export const useHintsDispatch = () => useContext(HintDispatch);

export const useCounter = () => useContext(Counter);
export const useCounterDispatch = () => useContext(CounterDispatch);
