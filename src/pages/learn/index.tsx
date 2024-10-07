import { Learn } from "@/modules/learn/page";
import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";
import { Container } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container
      overflow="hidden"
      minH="100vh"
      py="8px"
      maxWidth="538px"
      px="16px"
    >
      <Learn />
    </Container>
  );
};

export default Index;
