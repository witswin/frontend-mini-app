import { Box, Container } from "@chakra-ui/react";
import { BottomNavbar } from "./BottomNavbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="0"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
      pb="106px"
    >
      <Box px="16px" width="full">
        {children}
      </Box>
      <BottomNavbar />
    </Container>
  );
};
