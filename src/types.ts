import { quizType } from "./globalTypes";

export enum CHOICE_BUTTON_STATE {
  'disabled' = 'disabled',
  'deafult' = 'deafault',
  'selected' = 'selected',
  'blink' = 'blink',
  'correct' = 'correct',
  'wrong' = 'wrong',
  'percentage' = 'percentage',
  'selectedPercentage' = 'selectedPercentage'
}

export enum INFO_CARD_STATE {
  "welcome" = "welcome",
  "resource" = "resource",
  "lobby" = "lobby",
  "join" = "join",
  "watch" = "watch",
}

export enum CARD_STATE {
  "resource" = "resource",
  "lobby" = "lobby",
  "join" = "join",
  "watch" = "watch",
  "enroll" = "enroll",
}

export enum PROGRESS_TIME {
  "default" = "default",
  "alert" = "alert",
  "freeze" = "freeze",
}

// export type quizCardInfo = {
//   prize: number;
//   prizeText: string;
//   values: {
//     id: number;
//     text: string;
//   }[];
//   capacity: number;
//   enrolledNumber: number;
//   unitPrize: string;
//   isEnrolled: boolean;
// };
export type QuizCardProps = Partial<{
  quiz: quizType;
  colored: boolean;
  onOpen?: () => void;
}> & { state: CARD_STATE };
