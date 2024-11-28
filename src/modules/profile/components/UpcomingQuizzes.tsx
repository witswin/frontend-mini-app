import { quizType, userQuiz } from "@/globalTypes";
import { Button, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Sleepy from "@/assets/sleepy.svg";
import { QuizCard } from "@/components/QuizCard";
import { useGetCardState } from "@/modules/quiz/hooks";

const QuizAndState = ({ quiz }: { quiz: quizType }) => {
  const state = useGetCardState(quiz);
  return <QuizCard quiz={quiz} state={state} />;
};

export const UpcomingQuizzes = ({ quizzes }: { quizzes: userQuiz[] }) => {
  const isEmpty = quizzes?.length === 0;

  return (
    <VStack w="full" gap="16px" py={isEmpty ? "24px" : "0"}>
      {isEmpty ? (
        <>
          <Image src={Sleepy} alt="sleepy" />
          <Text fontSize="lg" color="gray.80" fontWeight={500}>
            No upcoming quizzes{" "}
          </Text>

          <Button variant="outline" size="md" as={Link} href="/quiz">
            Browse Quizzes
          </Button>
        </>
      ) : (
        quizzes.map((quiz) => (
          <QuizAndState quiz={quiz.competition} key={quiz.competition.id} />
        ))
      )}
    </VStack>
  );
};
