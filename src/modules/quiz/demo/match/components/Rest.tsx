import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Text, VStack } from '@chakra-ui/react';
import SpectatorImg from '@/assets/rest-spectator.svg';
import PlayerImg from '@/assets/rest-player.svg';
import { Card } from '@/components/Card';
import { useDemoQuizData } from '../hooks';

interface RestProps {
  seconds: number;
}

export const Rest = ({ seconds }: RestProps) => {
  const [countDown, setCountDown] = useState(seconds);
  const demoQuiz = useDemoQuizData();

  const activeQuestion = demoQuiz.question.find(
    (item) => item.id === demoQuiz.activeQuestionId,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev - 1 >= 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card minH="554px" justifyContent="center">
      <VStack w="full" h="full" justifyContent="center" gap="24px" mb="20px">
        <Image
          src={
            activeQuestion.selectedChoice === activeQuestion.correct
              ? PlayerImg
              : SpectatorImg
          }
          alt=""
        />
      </VStack>
      <Text
        position="absolute"
        bottom="12px"
        fontSize="sm"
        color="gray.80"
        fontWeight={700}
      >{`Next Questions in ${countDown} seconds... `}</Text>
    </Card>
  );
};
