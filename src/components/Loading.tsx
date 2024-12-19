import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

export const Loading: React.FC = () => {
  return (
    <Center>
      <Spinner size="md" color="gray.40" />
    </Center>
  );
};
