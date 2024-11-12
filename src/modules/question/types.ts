import { question, quizStats, quizType } from "@/globalTypes";
import { HINTS } from "@/types";

export type questionData = {
  quiz: quizType;
  question: question;
  quizStats: quizStats;
};

export type selectedHint = {
  id: string;
  type: HINTS;
};
export type hint = {
  usedHints: { questionId: number; hintType: HINTS; hintId: string }[];
  selectedHints: selectedHint[];
};
