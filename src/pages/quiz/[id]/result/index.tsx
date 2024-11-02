import { Result } from "@/modules/quiz/pdp/result/page";
import { Box, Container } from "@chakra-ui/react";
import React, { ReactElement } from "react";

const Index = () => {
  return <Result />;
};

export default Index;

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="0"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box width="full" h="full">
        {page}
      </Box>
    </Container>
  );
};
