import { Box } from "@chakra-ui/react";
import { BottomNavbar } from "./BottomNavbar";
import { TopNavbar } from "./TopNavbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Header */}
      <TopNavbar />

      {/* Main content */}
      <Box w="full" my="16px">
        {children}
      </Box>

      {/* Footer */}
      <BottomNavbar />
    </>
  );
};
