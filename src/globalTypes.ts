import { HINTS } from "./types";
import { QUESTION_STATE } from "./types";

export declare type sponsorType = {
  id: number;
  name: string;
  link: string;
  description: string;
  image: string;
};

export declare type hintType = {
  title: string;
  description: string;
  hintType: HINTS;
  id: number;
  isActive: boolean;
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
  isFinished: boolean;
  hintCount: number;
  userProfile: number;
  questionTimeSeconds: number;
  maxParticipants: number;
  restTimeSeconds: number;
  builtInHints: builtInHint[];
  resources: resource[];
};

export declare type resource = {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: string;
  isActive: boolean;
  competition: quizType;
};

export declare type builtInHint = {
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
  correct: correctChoice | null;
};

export declare type quizStats = {
  usersParticipating: number;
  prizeToWin: number;
  totalParticipantsCount: number;
  questionsCount: number;
  hintCount: number;
  previousRoundLosses: number;
};

export declare type correctChoice = {
  answerId: number;
  questionNumber: number;
  questionId: number;
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

export declare type quizFinishedData = {
  firstName: string;
  lastName: string;
  pk: number;
  username: string;
  wallets: [{ createdAt: string; walletAddress: string }];
};
