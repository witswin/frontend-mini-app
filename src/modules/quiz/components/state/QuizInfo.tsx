import { QuizPrize } from '@/components/QuizCard';
import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { STATUS_ENROLL_VALUE } from '../../types';
import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useId,
  useMemo,
} from 'react';
import { useSelectedQuiz } from '../../hooks';
import { HintCard } from '@/components/HintCards';
import { useHints, useHintsDispatch } from '@/modules/question/hooks';
import { LightbulbBolt } from 'solar-icon-set';
import { HINTS } from '@/types';

interface ValueCardProps {
  title: string | number;
  subTitle: string;
  status: STATUS_ENROLL_VALUE;
}
const ValueCard = ({ subTitle, title, status }: ValueCardProps) => {
  const statusComponents = useMemo(() => {
    return {
      [STATUS_ENROLL_VALUE.QUESTION]: {
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title}
          </Text>
        ),
      },
      [STATUS_ENROLL_VALUE.TIME]: {
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title} s
          </Text>
        ),
      },
    };
  }, []);

  return (
    <VStack
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.400"
      bg="glassBackground"
      flex={1}
      py="12px"
    >
      {statusComponents[status].title}
      <Text
        textAlign="center"
        width="full"
        fontSize="sm"
        fontWeight="600"
        color="gray.60"
      >
        {subTitle}
      </Text>
    </VStack>
  );
};

const QuizInfo = ({
  setHintModal,
}: {
  setHintModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedQuiz = useSelectedQuiz();
  const hintsDispatch = useHintsDispatch();
  const hints = useHints();

  const localId = useId();

  useEffect(() => {
    hintsDispatch((prev) => ({
      ...prev,
      selectedHints: [
        {
          type: HINTS.fifty,
          localId,
          id: +selectedQuiz?.builtInHints?.find(
            (item) => item?.hint?.hintType === HINTS?.fifty,
          )?.hint?.id,
        },
      ],
    }));
  }, []);

  return (
    <Flex flexDirection="column" width="100%" alignItems="center" rowGap="16px">
      <Center
        py="12px"
        borderRadius="10px"
        bg="var(--chakra-colors-glassBackground)"
        width="full"
        sx={{
          '&>div:first-of-type, span': {
            width: 'fit-content',
            textAlign: 'center',
            mx: 'auto',
          },
        }}
      >
        <QuizPrize
          prize={
            selectedQuiz?.formattedPrize ? selectedQuiz?.formattedPrize : 0
          }
          unitPrize={selectedQuiz?.token}
        />
      </Center>
      <Flex width="full" columnGap="12px">
        <ValueCard
          status={STATUS_ENROLL_VALUE.QUESTION}
          subTitle="Questions"
          title={selectedQuiz?.questions?.length}
        />
        <ValueCard
          status={STATUS_ENROLL_VALUE.TIME}
          subTitle="Each Question"
          title={selectedQuiz?.questionTimeSeconds}
        />
      </Flex>

      {selectedQuiz?.builtInHints?.length !== 0 && (
        <VStack
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.400"
          bg="glassBackground"
          p="12px"
          width="full"
        >
          <HStack gap="4px" alignItems="start">
            <LightbulbBolt iconStyle="Bold" size={25} />
            <Text fontSize="3xl" fontWeight="700">
              Hints
            </Text>
          </HStack>
          <Flex width="full" columnGap="12px">
            <HintCard
              setHintModal={setHintModal}
              hint={hints?.selectedHints?.[0]}
            />
            <HintCard
              setHintModal={setHintModal}
              hint={hints?.selectedHints?.[1]}
            />
          </Flex>
        </VStack>
      )}
    </Flex>
  );
};
const MemoizedQuizInfo = memo(QuizInfo);
export { MemoizedQuizInfo as QuizInfo };
