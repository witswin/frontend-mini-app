import { memo } from "react";
import { QuizCard } from "@/components/QuizCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { VStack } from "@chakra-ui/react";
import { useEnrolledModalProps, useGetCardState } from "../hooks";
import { useRouter } from "next/router";
import { quizType } from "@/globalTypes";

interface SwiperItemProps {
  quiz: quizType;
}
const SwiperItem = ({ quiz }: SwiperItemProps) => {
  const { ref, isIntersecting } = useIntersectionObserver(false, {
    root: null,
    threshold: 1,
    rootMargin: "100% 0px 100% 0px",
  });
  const { onOpen } = useEnrolledModalProps();
  const router = useRouter();

  const cardState = useGetCardState(quiz);

  return (
    <VStack onClick={() => router.push(`/quiz/${quiz?.id}`)} width="full">
      <QuizCard
        isLarge
        onOpen={onOpen}
        ref={ref}
        state={cardState}
        colored={isIntersecting && !quiz?.isFinished}
        quiz={quiz}
      />
    </VStack>
  );
};
const MemoizedSwiperItem = memo(SwiperItem);
export { MemoizedSwiperItem };
