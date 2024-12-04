import { useContext } from "react";
import { QuizFinishedInfo } from "./context";

export const useFinishedData = () => useContext(QuizFinishedInfo);
