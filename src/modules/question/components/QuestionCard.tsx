import { Card } from "@/components/Card";
import { QuestionBanner } from "./QuestionBanner";
import { ProgressTimer } from "@/components/ProgressTimer";
import { useQuestionData } from "../hooks";
import { ChoiceButton } from "@/components/ChoiceButton";
import { useState } from "react";
import { Text } from "@chakra-ui/react";

export const QuestionCard = () => {
  const {
    question: { choices },
  } = useQuestionData();
  const [selectedChoice, setSelectedChoice] = useState<string>(undefined);

  return (
    <Card>
      <QuestionBanner content="Why can’t we use fork for eating soup?" />
      <ProgressTimer hasCounter hasIcon />
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
