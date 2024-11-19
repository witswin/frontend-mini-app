import { ResultBottomNavbar } from "@/modules/quiz/pdp/result/components/ResultBottomNavbar";
import { Box, Container } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { ReactElement } from "react";

const Result = dynamic(
  () =>
    import("@/modules/quiz/pdp/result/page").then((modules) => modules.Result),
  { ssr: false }
);

const WebSocketProvider = dynamic(
  () =>
    import("@/context/WebSocket").then((modules) => modules.WebSocketProvider),
  { ssr: false }
);

const Index = () => {
  return (
    <WebSocketProvider>
      <Result />
    </WebSocketProvider>
  );
};

export default Index;

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      height="full"
      px="0"
      minH="100vh"
      position="relative"
    >
      <Box px="16px" width="full">
        {page}
      </Box>
      <ResultBottomNavbar />
    </Container>
  );
};
