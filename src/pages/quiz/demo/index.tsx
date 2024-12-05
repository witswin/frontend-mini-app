import { Index } from '@/modules/quiz/demo/page';
import { Box, Container } from '@chakra-ui/react';
import { ReactElement } from 'react';

const QuizPDP = () => {
  return <Index />;
};

export default QuizPDP;

QuizPDP.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="16px"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box width="full">{page}</Box>
    </Container>
  );
};
