import { HINTS } from "./types";

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
  hintCount: number;
  userProfile: number;
  questionTimeSeconds: number;
  maxParticipants: number;
  builtInHints: {id: number; count: number; hint: hintType}[]
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
