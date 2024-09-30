import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { createContext, PropsWithChildren } from "react";

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
