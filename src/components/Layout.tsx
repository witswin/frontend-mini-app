import { Box, Container, VStack } from "@chakra-ui/react";
import { BottomNavbar } from "./BottomNavbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      overflow="hidden"
      minH="100vh"
      py="8px"
      maxWidth="538px"
      px="16px"
      zIndex={1}
      position={"relative"}
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="16px"
    >
      <VStack flex={1} w="full" h="full">
        {children}
      </VStack>
      <BottomNavbar />
    </Container>
  );
};
