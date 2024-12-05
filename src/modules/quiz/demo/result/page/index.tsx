import { Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorFullText } from '@/components/ColorFullText';
import { Card } from '@/components/Card';
import { useRouter } from 'next/router';

export const Result = () => {
  const router = useRouter();
  return (
    <VStack
      flexDir="column"
      w="full"
      gap="16px"
      height="100vh"
      position="relative"
      pb="80px"
    >
      <Card height="full">
        <VStack justifyContent="space-between" width="full" height="full">
          <VStack width="full" height="full">
            <ColorFullText fontSize="4xl" textContent="Congratulations! 🎉" />
            <VStack mt="48px">
              <Text width="full" textAlign="center">
                You have successfully completed the test quiz. This was just a
                warm-up to familiarize you with the platform. Get ready for more
                exciting quizzes ahead!
              </Text>
            </VStack>
          </VStack>
          <Button onClick={() => router.push('/quiz')} width="full">
            Get start
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};
