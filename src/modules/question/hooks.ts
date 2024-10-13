import { useContext } from "react";
import { QuestionData, QuestionDataDispatch } from "./context";

export const useQuestionData = () => useContext(QuestionData);
export const useQuestionDataDispatch = () => useContext(QuestionDataDispatch);
