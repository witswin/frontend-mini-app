import { quizType } from "@/globalTypes";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export const EnrolledModalState = createContext<UseDisclosureProps>(undefined);

interface EnrolledModalProviderProps extends PropsWithChildren {}

export const EnrolledModalProvider = ({
  children,
}: EnrolledModalProviderProps) => {
  const disclosureProps = useDisclosure();
  return (
    <EnrolledModalState.Provider value={disclosureProps}>
      {children}
    </EnrolledModalState.Provider>
  );
};

export const SelectedQuiz = createContext<quizType>(undefined);
export const SelectedQuizDispatch =
  createContext<Dispatch<SetStateAction<quizType>>>(undefined);

interface SelectedQuizProviderProps extends PropsWithChildren {}
export const SelectedQuizProvider = ({
  children,
}: SelectedQuizProviderProps) => {
  const [state, setState] = useState<quizType>(undefined);
  return (
    <SelectedQuiz.Provider value={state}>
      <SelectedQuizDispatch.Provider value={setState}>
        {children}
      </SelectedQuizDispatch.Provider>
    </SelectedQuiz.Provider>
  );
};
