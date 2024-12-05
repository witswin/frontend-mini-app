import { Card } from '@/components/Card';
import { useDemoQuizCounter, useDemoQuizData } from '../hooks';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { QUESTION_STATE } from '@/types';
import { ChoiceButton } from './ChoiceButton';
import { Rest } from './Rest';
import { QuestionBanner } from '@/modules/question/components/QuestionBanner';
import { ProgressTimer } from './ProgressTimer';
import { getUniqueRandomNumbers } from '@/utils';

export const QuestionCard = () => {
  const demoQuiz = useDemoQuizData();
  const counter = useDemoQuizCounter();

  const [disabledChoices, setDisabledChoices] = useState<number[]>(undefined);
  const activeQuestion = demoQuiz.question[demoQuiz.activeQuestionId];

  useEffect(() => {
    if (
      demoQuiz.builtInHints[0].isUsed &&
      demoQuiz.builtInHints[0].questionId === demoQuiz.activeQuestionId
    ) {
      setDisabledChoices(getUniqueRandomNumbers(activeQuestion.correct));
    } else {
      setDisabledChoices([]);
    }
  }, [
    activeQuestion.correct,
    demoQuiz.activeQuestionId,
    demoQuiz.builtInHints,
  ]);

  return (
    <>
      {activeQuestion.state === QUESTION_STATE.rest ? (
        <Rest seconds={demoQuiz.restTimeSeconds - 3} />
      ) : (
        <Card sx={{ '&>div': { zIndex: 0 } }}>
          <QuestionBanner content={activeQuestion?.text} />
          <ProgressTimer
            timer={counter}
            state={activeQuestion?.state}
            hasCounter
            hasIcon
          />
          {activeQuestion?.choices?.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              disabledFiftyFiftyHint={disabledChoices?.includes(+choice.id)}
            />
          ))}
          <Text color="gray.200" fontSize="xs">
            By {activeQuestion?.creator}
          </Text>
        </Card>
      )}
    </>
  );
};
