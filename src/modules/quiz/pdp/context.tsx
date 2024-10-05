import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { quizPDP } from "./types";

export const QuizPDPGlobalState = createContext<quizPDP>(undefined);
export const QuizPDPGlobalDispatch =
  createContext<Dispatch<SetStateAction<quizPDP>>>(undefined);

interface QuizPDPGlobalProviderProps extends PropsWithChildren {
  data: quizPDP;
}
export const QuizPDPGlobalProvider = ({
  children,
  data,
}: QuizPDPGlobalProviderProps) => {
  const [state, setState] = useState<quizPDP>(data);
  console.log(data);

  return (
    <QuizPDPGlobalState.Provider value={state}>
      <QuizPDPGlobalDispatch.Provider value={setState}>
        {children}
      </QuizPDPGlobalDispatch.Provider>
    </QuizPDPGlobalState.Provider>
  );
};
