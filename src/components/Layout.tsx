import { Box, VStack } from "@chakra-ui/react";
import { BottomNavbar } from "./BottomNavbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <VStack h="calc(100% - 106px)" w="full">
      {children}

      <BottomNavbar />
    </VStack>
  );
};
