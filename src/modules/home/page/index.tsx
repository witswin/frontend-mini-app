import { QuizCard } from '@/components/QuizCard';
import { CARD_STATE, INFO_CARD_STATE } from '@/types';
import { Center, VStack } from '@chakra-ui/react';
import { TopNavbar } from '@/components/TopNavbar';
import { useMemo } from 'react';
import { InfoCard } from '../components/InfoCard';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/configs/axios';
import { useGetHomeCardState } from '../hooks';
import { Loading } from '@/components/Loading';

interface HomeProps {
  hasCompetitions?: boolean;
}
export const Home = ({ hasCompetitions }: HomeProps) => {
  const {
    data: closeCompetition,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['closetCompetition'],
    queryFn: async () =>
      await axiosClient
        .get('/quiz/competitions/latest')
        .then((res) => res.data),
  });

  const cardState = useGetHomeCardState(closeCompetition);

  const infoCard = useMemo(() => {
    return {
      [INFO_CARD_STATE.welcome]: (
        <InfoCard
          hasCompetitions={hasCompetitions}
          state={INFO_CARD_STATE.welcome}
        />
      ),
      [INFO_CARD_STATE.join]: (
        <VStack
          pb="150px"
          width="full"
          h="full"
          gap="16px"
          justifyContent="flex-start"
        >
          <InfoCard
            hasCompetitions={hasCompetitions}
            state={INFO_CARD_STATE.join}
          />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.join} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.lobby]: (
        <VStack
          pb="150px"
          width="full"
          h="full"
          gap="16px"
          justifyContent="flex-start"
        >
          <InfoCard
            hasCompetitions={hasCompetitions}
            state={INFO_CARD_STATE.lobby}
          />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.lobby} colored />
        </VStack>
      ),
      [INFO_CARD_STATE.resource]: (
        <VStack
          pb="150px"
          width="full"
          h="full"
          gap="16px"
          justifyContent="flex-start"
        >
          <InfoCard
            hasCompetitions={hasCompetitions}
            state={INFO_CARD_STATE.resource}
          />
          <QuizCard
            quiz={closeCompetition}
            state={CARD_STATE.resource}
            colored
          />
        </VStack>
      ),
      [INFO_CARD_STATE.watch]: (
        <VStack
          pb="150px"
          width="full"
          h="full"
          gap="16px"
          justifyContent="flex-start"
        >
          <InfoCard
            hasCompetitions={hasCompetitions}
            state={INFO_CARD_STATE.watch}
          />
          <QuizCard quiz={closeCompetition} state={CARD_STATE.watch} colored />
        </VStack>
      ),
    };
  }, [closeCompetition, hasCompetitions]);

  return (
    <VStack height="full" w="full" rowGap="16px">
      <TopNavbar />
      {isLoading || isFetching ? (
        <Center height="full">
          <Loading />
        </Center>
      ) : (
        infoCard[cardState]
      )}
    </VStack>
  );
};
