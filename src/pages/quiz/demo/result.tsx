import { Result } from '@/modules/quiz/demo/result/page';
import { ResultBottomNavbar } from '@/modules/quiz/pdp/result/components/ResultBottomNavbar';
import { Box, Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

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
