export enum INFO_CARD_STATE {
  "welcome" = 'welcome',
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
}

export type quizCardInfo = {
  prize: number;
  prizeText: string;
  values: {
    id: number;
    text: string;
  }[];
  capacity: number;
  enrolledNumber: number;
  unitPrize: string;
  isEnrolled: boolean;
};
export type QuizCardProps = Partial<{
  quizCardInfo: Partial<quizCardInfo>;
  colored: boolean;
  onOpen?: () => void;
}> & { state: CARD_STATE };
