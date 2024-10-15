import { QUESTION_STATE } from "@/types";

export type questionData = {
  activeQuestionId: number;
  questions: {
    title: string;
    state: QUESTION_STATE;
    timer: number;
    id: number;
    correct: number;
    choices: { id: string; title: string }[];
  }[];
};
