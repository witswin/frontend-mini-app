import { QUESTION_STATE } from "@/types";

export type questionData = {
  state: QUESTION_STATE;
  timer: number;
  question: {
    id: number;
    correct: number;
    choices: { id: string; title: string }[];
  };
};
