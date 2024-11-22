import { HINTS } from "./types"
import { QUESTION_STATE } from "./types"

export declare type userQuiz = {
  isWinner: boolean
  amountWon: number
  hintCount: number
  isClaimTriggered: boolean
  registeredHints: hintType[]
  userProfile: number
  txHash: string
  competition: quizType
  id: number
}

export declare type profileInfo = {
  pk: number
  username: string
  wallets: {
    walletAddress: string
    createdAt: string
  }[]
  image?: string
  neuron: number
  first_name: string
  last_name: string
}

export declare type profileStats = {
  rank: number
  winrate: number
  quizCount: number
}

export declare type sponsorType = {
  id: number
  name: string
  link: string
  description: string
  image: string
}

export declare type hintType = {
  title: string
  description: string
  hintType: HINTS
  id: number
  isActive: boolean
}

export declare type quizType = {
  formattedPrize: number
  id: number
  questions: Record<"pk" | "number", number>[]
  sponsors: sponsorType[]
  participantsCount: number
  title: string
  details: string
  createdAt: string
  startAt: string
  prizeAmount: number
  chainId: number
  tokenDecimals: number
  token: string
  tokenAddress: string
  discordUrl: string
  twitterUrl: string
  emailUrl: string
  telegramUrl: string
  tokenImage: string
  image: string
  shuffleAnswers: boolean
  splitPrize: boolean
  txHash: string
  isActive: boolean
  isFinished: boolean
  hintCount: number
  userProfile: number
  questionTimeSeconds: number
  maxParticipants: number
  restTimeSeconds: number
  builtInHints: builtInHint[]
  resources: resource[]
  questionHintTimeSeconds: number
}

export declare type resource = {
  id: number
  title: string
  content: string
  image: string
  created_at: string
  isActive: boolean
  competition: quizType
  link: string
  linkText: string
}

export declare type builtInHint = {
  count: number
  id: number
  hint: {
    description: string
    hintType: "stats" | "time" | "fifty"
    icon: string
    id: number
    isActive: boolean
    title: string
  }
}

export declare type question = {
  amountWonPerUser: number
  choices: choice[]
  competition: number
  id: number
  isEligible: boolean
  number: number
  remainParticipantsCount: number
  state: QUESTION_STATE
  text: string
  totalParticipantsCount: number
  correct: correctChoice | null
  selectedChoice: number
  creator: string
}

export declare type quizStats = {
  usersParticipating: number
  prizeToWin: number
  totalParticipantsCount: number
  questionsCount: number
  hintCount: number
  previousRoundLosses: number
}

export declare type correctChoice = {
  answerId: number
  questionNumber: number
  questionId: number
}

export declare type choice = {
  id: number
  isCorrect: boolean | null
  text: string
  question: number
}

export declare type auth = {
  pk: number
  username: string
  token: string
}

export declare type enrolledCompetition = {
  id: number
  registeredHints: [
    {
      description: string
      hintType: string
      icon: unknown
      id: number
      isActive: boolean
      title: string
    }
  ]
  is_winner: boolean
  amount_won: string
  hint_count: number
  tx_hash: string
  user_profile: number
  competition: number
}

export declare type quizFinishedData = {
  firstName: string
  lastName: string
  pk: number
  username: string
  wallets: [{ createdAt: string; walletAddress: string }]
}
