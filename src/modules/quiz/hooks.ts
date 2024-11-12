import { useContext, useEffect, useState } from "react";
import {
  EnrolledModalState,
  SelectedQuiz,
  SelectedQuizDispatch,
} from "./context";
import { quizType } from "@/globalTypes";
import { useCheckEnrolled } from "../home/hooks";
import { CARD_STATE } from "@/types";
// import { useCalculateStartUTCTime } from "@/hooks/useCalculateUTCTime";
import { LOBBY_THRESHOLD } from "@/constants";

export const useEnrolledModalProps = () => useContext(EnrolledModalState);
export const useSelectedQuiz = () => useContext(SelectedQuiz);
export const useSelectedQuizDispatch = () => useContext(SelectedQuizDispatch);

export const useGetCardState = (competition: quizType) => {
  const enrolledChecker = useCheckEnrolled();

  const [competitionState, setCompetitionState] =
    useState<CARD_STATE>(undefined);
  const [timeState, setTimeState] = useState(undefined);

  const isEnrolled = enrolledChecker(competition?.id);

  // const leftTimeCalculator = useCalculateStartUTCTime();
  const convertedStartAt = new Date(competition?.startAt).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const calculatedTime = convertedStartAt - new Date().getTime();
      if (calculatedTime > LOBBY_THRESHOLD) {
        setTimeState("default");
      } else if (calculatedTime <= LOBBY_THRESHOLD && calculatedTime > 10000) {
        setTimeState("lobby");
      } else if (calculatedTime <= 10000 && calculatedTime >= 0) {
        setTimeState("close");
      } else {
        setTimeState("expired");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isEnrolled && timeState !== "expired") {
      setCompetitionState(CARD_STATE.enroll);
    } else {
      if (timeState === "default") {
        setCompetitionState(CARD_STATE.resource);
      } else if (timeState === "lobby") {
        setCompetitionState(CARD_STATE.lobby);
      } else if (timeState === "close") {
        setCompetitionState(CARD_STATE.join);
      } else {
        setCompetitionState(CARD_STATE.watch);
      }
    }
  }, [timeState, isEnrolled]);

  return competitionState;
};
