import { Card } from "@/components/Card";
import { QuestionBanner } from "./QuestionBanner";
import { ProgressTimer } from "@/components/ProgressTimer";
import { useQuestionData } from "../hooks";
import { ChoiceButton } from "@/components/ChoiceButton";
import { useState } from "react";
import { Text } from "@chakra-ui/react";

export const QuestionCard = () => {
  const { questions, activeQuestionId } = useQuestionData();
  const { choices, state, timer, title } = questions.find(
    (item) => item.id === activeQuestionId
  );
  const [selectedChoice, setSelectedChoice] = useState<string>(undefined);

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
        />
      ))}
      <Text color="gray.200" fontSize="xs">
        By Adams Sandler
      </Text>
    </Card>
  );
};
