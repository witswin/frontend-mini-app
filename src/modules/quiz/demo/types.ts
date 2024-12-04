export enum QUIZ_STATE {
  "default" = "default",
  "lobby" = "lobby",
  "started" = "started",
  "penalty" = "penalty",
}

export type quizPDP = {
  quizState: QUIZ_STATE;
  isEnrolled: boolean;
  quizStartedDate: number;
  heart: number;
};
