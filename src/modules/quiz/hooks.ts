import { useContext } from "react";
import {
  EnrolledModalState,
  SelectedQuiz,
  SelectedQuizDispatch,
} from "./context";

export const useEnrolledModalProps = () => useContext(EnrolledModalState);
export const useSelectedQuiz = () => useContext(SelectedQuiz);
export const useSelectedQuizDispatch = () => useContext(SelectedQuizDispatch);
