import { Box, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import HeaderBg from '@/assets/QuestionHeaderBg.svg';
import Image from 'next/image';
import { ColorFullText } from '@/components/ColorFullText';
import { useQuestionData } from '../hooks';

export const TopNavbar = () => {
  const [isLarge] = useMediaQuery('(min-width: 500px)');

  const { question, quiz, quizStats } = useQuestionData();

  return (
    <HStack
      h={isLarge ? '120px' : '90px'}
      w="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
      px={isLarge ? '16px' : '0'}
      pb="38px"
    >
      <Box
        zIndex={0}
        width="full"
        height="full"
        position="absolute"
        filter="blur(100px)"
        background="radial-gradient(101.43% 155% at 49.76% -9%, #9553F6 0%, #6E81EE 29.98%, #63C6E1 100%)"
      />
      <Box position="absolute" zIndex="base" width="100%" height="100%">
        <Image
          src={HeaderBg}
          alt="navbar background illustration."
          layout="responsive"
        />
      </Box>

      <HStack zIndex="docked" w="full" justifyContent="space-between" px="12px">
        <VStack alignItems="start">
          <Text color="gray.40" fontSize="sm" fontWeight={700}>
            Question
          </Text>
          <HStack gap="4px">
            <Text color="gray.0" fontSize="lg" fontWeight={700}>
              {question?.number || 0}
            </Text>
            <Text color="gray.80" fontSize="xs" fontWeight="bold">
              / {quiz.questions.length}
            </Text>
          </HStack>
        </VStack>

        <HStack gap="6px" alignItems="center" mt="30px">
          <ColorFullText
            fontSize="4xl"
            fontWeight={700}
            textContent={
              question?.amountWonPerUser
                ? String(question?.amountWonPerUser / 1e6)
                : '0'
            }
          />
          <ColorFullText fontSize="xs" fontWeight={700} textContent={'USDT'} />
        </HStack>

        <VStack alignItems="end">
          <Text color="gray.40" fontSize="sm" fontWeight={700}>
            Survivors
          </Text>
          <HStack gap="4px">
            <Text color="gray.0" fontSize="lg" fontWeight={700}>
              {!!quizStats?.usersParticipating
                ? quizStats?.usersParticipating
                : 0}
            </Text>
            <Text color="gray.80" fontSize="xs" fontWeight="bold">
              /{' '}
              {!!quizStats?.totalParticipantsCount
                ? quizStats?.totalParticipantsCount
                : 0}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};
