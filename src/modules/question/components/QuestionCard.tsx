import { Card } from "@/components/Card";
import { QuestionBanner } from "./QuestionBanner";
import { ProgressTimer } from "@/components/ProgressTimer";
import { useHints, useQuestionData } from "../hooks";
import { ChoiceButton } from "@/components/ChoiceButton";
import { useMemo, useState } from "react";
import { Text } from "@chakra-ui/react";
import { HINTS } from "@/types";
import { getUniqueRandomNumbers } from "@/utils";

export const QuestionCard = () => {
  const { questions, activeQuestionId } = useQuestionData();
  const { choices, state, timer, title } = questions.find(
    (item) => item.id === activeQuestionId
  );
  const activeQuestion = questions.find((item) => item.id === activeQuestionId);

  const [selectedChoice, setSelectedChoice] = useState<string>(undefined);

  const hints = useHints();

  const usedHints = hints.usedHints;
  const questionHintInfo = usedHints.find(
    (item) => item.hintType === HINTS.fiftyFifty
  );

  const disabledChoices = useMemo(() => {
    const questionHint = hints.usedHints.find(
      (item) => item.hintType === HINTS.fiftyFifty
    );
    if (questionHint && +questionHint.questionId === +activeQuestionId) {
      const randomButtonId = getUniqueRandomNumbers(activeQuestion.correct);

      return randomButtonId;
    }
  }, [hints.usedHints, activeQuestionId]);

  return (
    <Card>
      <QuestionBanner content={title} />
      <ProgressTimer timer={timer} state={state} hasCounter hasIcon />
      {choices.map((choice) => (
        <ChoiceButton
          setSelectedChoice={setSelectedChoice}
          selectedChoice={selectedChoice}
          key={choice.id}
          buttonInfo={choice}
          disabledFiftyFiftyHint={
            +questionHintInfo?.questionId === +activeQuestionId &&
            disabledChoices?.includes(+choice.id)
          }
        />
      ))}
      <Text color="gray.200" fontSize="xs">
        By Adams Sandler
      </Text>
    </Card>
  );
};
