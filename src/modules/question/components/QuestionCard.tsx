import { Card } from "@/components/Card";
import { QuestionBanner } from "./QuestionBanner";
import { ProgressTimer } from "@/components/ProgressTimer";
import { useQuestionData } from "../hooks";
import { ChoiceButton } from "@/components/ChoiceButton";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { QUESTION_STATE } from "@/types";
import { Rest } from "./Rest";

export const QuestionCard = () => {
  const { question, quiz } = useQuestionData();

  const [selectedChoice, setSelectedChoice] = useState<number>(undefined);

  // const hints = useHints();

  // const usedHints = hints.usedHints;
  // const questionHintInfo = usedHints.find(
  //   (item) => item.hintType === HINTS.fifty && +item.questionId === +question?.id
  // );

  console.log(quiz);

  // const disabledChoices = useMemo(() => {
  //   if (questionHintInfo) {
  //     const randomButtonId = getUniqueRandomNumbers(question.correct);

  //     return randomButtonId;
  //   }
  // }, [hints.usedHints, question]);

  // console.log({ disabledChoices });

  return question?.state === QUESTION_STATE.rest ? (
    <Rest
      seconds={quiz.restTimeSeconds - 3}
      isSpectator={
        !question.isEligible || selectedChoice !== question.correct.answerId
      }
    />
  ) : (
    <Card>
      <QuestionBanner content={question?.text} />
      <ProgressTimer
        timer={question?.timer}
        state={question?.state}
        hasCounter
        hasIcon
      />
      {question?.choices?.map((choice) => (
        <ChoiceButton
          setSelectedChoice={setSelectedChoice}
          selectedChoice={selectedChoice}
          key={choice.id}
          choice={choice}
          // disabledFiftyFiftyHint={
          //   +questionHintInfo?.questionId === +question.id &&
          //   disabledChoices?.includes(+choice.id)
          // }
        />
      ))}
      <Text color="gray.200" fontSize="xs">
        By Adams Sandler
      </Text>
    </Card>
  );
};
