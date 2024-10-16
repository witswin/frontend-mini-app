import {
  CounterProvider,
  HintProvider,
  QuestionDataProvider,
} from "@/modules/question/context";
import { Question } from "@/modules/question/page";
import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";

const Index = () => {
  return (
    <CounterProvider>
      <HintProvider>
        <QuestionDataProvider timer={10}>
          <Question />
        </QuestionDataProvider>
      </HintProvider>
    </CounterProvider>
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
      display="flex"
      height="full"
      px="0"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box px="16px" width="full">
        {page}
      </Box>
    </Container>
  );
};
