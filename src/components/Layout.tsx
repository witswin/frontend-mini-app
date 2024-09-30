import { Box } from "@chakra-ui/react";
import { BottomNavbar } from "./BottomNavbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box w="full" my="16px">
        {children}
      </Box>

      <BottomNavbar />
    </>
  );
};
