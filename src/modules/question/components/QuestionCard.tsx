import { Card } from "@/components/Card";
import { QuestionBanner } from "./QuestionBanner";
import { ProgressTimer } from "@/components/ProgressTimer";
import { useHints, useQuestionData } from "../hooks";
import { ChoiceButton } from "@/components/ChoiceButton";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { HINTS, QUESTION_STATE } from "@/types";
import { Rest } from "./Rest";
import { useWebSocket } from "@/hooks/useWebSocket";

export const QuestionCard = () => {
  const { question, quiz } = useQuestionData();

  const isUsedExtraTimeHint = useHints().usedHints.find(
    (item) => item.hintType === HINTS.time && question.id === item.questionId
  );
  const hints = useHints();

  const [disabledChoices, setDisabledChoices] = useState<number[]>(undefined);

  const usedHints = hints.usedHints;
  const questionFiftyHintInfo = usedHints.find(
    (item) =>
      item.hintType === HINTS.fifty && +item.questionId === +question?.id
  );

  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket.current.client) return;
    const handleMessage = (e: MessageEvent) => {
      if (e.data !== "PONG") {
        const data = JSON.parse(e.data);
        if (
          data.questionId === question.id &&
          data.hintType === HINTS.fifty &&
          questionFiftyHintInfo
        ) {
          setDisabledChoices(data.data);
        }
      }
    };
    socket.current.client.addEventListener("message", handleMessage);
    return () => {
      socket.current.client?.removeEventListener("message", handleMessage);
    };
  }, [hints.usedHints, question, socket]);

  console.log({ disabledChoices });

  return question?.state === QUESTION_STATE.rest ? (
    <Rest
      seconds={
        isUsedExtraTimeHint
          ? quiz.restTimeSeconds - 3 - quiz.questionHintTimeSeconds
          : quiz.restTimeSeconds - 3
      }
      isSpectator={
        !question.isEligible ||
        question?.selectedChoice !== question.correct.answerId
      }
    />
  ) : (
    <Card sx={{ "&>div": { zIndex: 0 } }}>
      <QuestionBanner content={question?.text} />
      <ProgressTimer
        timer={question?.timer}
        state={question?.state}
        hasCounter
        hasIcon
      />
      {question?.choices?.map((choice) => (
        <ChoiceButton
          key={choice.id}
          choice={choice}
          disabledFiftyFiftyHint={disabledChoices?.includes(+choice.id)}
        />
      ))}
      <Text color="gray.200" fontSize="xs">
        By Adams Sandler
      </Text>
    </Card>
  );
};
