import { quizType } from '@/globalTypes';
import { HStack, Text } from '@chakra-ui/react';

interface ParticipantsCountProps {
  quiz: quizType;
}

export const ParticipantsCount = ({ quiz }: ParticipantsCountProps) => {
  const { participantsCount, isFinished, maxParticipants } = quiz;
  const isGreaterTanNinetyPercent =
    participantsCount >= (90 * maxParticipants) / 100;

  return (
    <HStack>
      <Text
        fontSize="10px"
        fontWeight="600"
        color={
          isFinished
            ? 'gray.100'
            : isGreaterTanNinetyPercent
            ? 'red.400'
            : 'green.400'
        }
      >
        {participantsCount}/{maxParticipants}{' '}
        {maxParticipants === participantsCount
          ? 'Enrolled'
          : isGreaterTanNinetyPercent
          ? `Enrolled. Only ${maxParticipants - participantsCount} Spots Left!`
          : 'Enrolled'}
      </Text>
    </HStack>
  );
};
