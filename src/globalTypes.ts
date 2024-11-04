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
};

export declare type auth = {
  pk: number;
  username: string;
  walletAddress: string;
};
