import React from 'react';
import { Card } from './Card';
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { userQuiz } from '@/globalTypes';
import { UpcomingQuizzes } from './UpcomingQuizzes';
import { CompletedQuizzes } from './CompletedQuizzes';

interface Props {
  quizzes: userQuiz[];
}

export const Quizzes = ({ quizzes }: Props) => {
  const upcomingQuizzes = quizzes?.filter(
    (quiz) => quiz?.competition?.isFinished === false,
  );
  const completedQuizzes = quizzes
    ?.filter((quiz) => quiz?.competition?.isFinished === true)
    ?.sort((a, b) => (a?.txHash ? 1 : 0) - (b?.txHash ? 1 : 0));

  return (
    <Card gap="16px">
      <Text fontSize="2xl" fontWeight={700} color="gray.0">
        Quizzes
      </Text>

      <Tabs defaultIndex={1} isFitted w="full" variant="unstyled">
        <TabList h="46px" p="4px" bg="glassBackground" rounded="10px" mb="16px">
          <Tab>Upcoming</Tab>
          <Tab>Completed</Tab>
          <TabIndicator height="38px" bg="blue" rounded="8px" zIndex={-1} />
        </TabList>

        <TabPanels>
          <TabPanel>
            <UpcomingQuizzes quizzes={upcomingQuizzes} />
          </TabPanel>
          <TabPanel>
            <CompletedQuizzes quizzes={completedQuizzes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};
