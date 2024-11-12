import { QUESTION_STATE } from "./types";

export declare type sponsorType = {
  id: number;
  name: string;
  link: string;
  description: string;
  image: string;
};
export declare type quizType = {
  id: number;
  questions: Record<"pk" | "number", number>[];
  sponsors: sponsorType[];
  participantsCount: number;
  title: string;
  details: string;
  createdAt: string;
  startAt: string;
  prizeAmount: number;
  chainId: number;
  tokenDecimals: number;
  token: string;
  tokenAddress: string;
  discordUrl: string;
  twitterUrl: string;
  emailUrl: string;
  telegramUrl: string;
  tokenImage: string;
  image: string;
  shuffleAnswers: boolean;
  splitPrize: boolean;
  txHash: string;
  isActive: boolean;
  hintCount: number;
  userProfile: number;
  questionTimeSeconds: number;
  maxParticipants: number;
  builtInHints: {
    count: number;
    id: number;
    hint: {
      description: string;
      hintType: "stats" | "time" | "fifty";
      icon: string;
      id: number;
      isActive: boolean;
      title: string;
    };
  }[];
};

export declare type question = {
  amountWonPerUser: number;
  choices: choice[];
  competition: number;
  id: number;
  isEligible: boolean;
  number: number;
  remainParticipantsCount: number;
  state: QUESTION_STATE;
  text: string;
  timer: number;
  totalParticipantsCount: number;
  correct: number | null;
};

export declare type choice = {
  id: number;
  isCorrect: boolean | null;
  text: string;
  question: number;
};

export declare type auth = {
  pk: number;
  username: string;
  walletAddress: string;
  token: string;
  neurons: number
};

export declare type enrolledCompetition = {
  id: number;
  registered_hints: string;
  is_winner: boolean;
  amount_won: string;
  hint_count: number;
  tx_hash: string;
  user_profile: number;
  competition: number;
};
