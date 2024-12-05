import { useContext } from "react";
import { QuizPDPGlobalDispatch, QuizPDPGlobalState } from "./context";

export const useQuizPDPGlobalInfo = () => useContext(QuizPDPGlobalState);
export const useQuizPDPGlobalInfoDispatch = () =>
  useContext(QuizPDPGlobalDispatch);
