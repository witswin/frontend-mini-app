import { memo } from "react";
import { QuizCard } from "@/components/QuizCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CARD_STATE } from "@/types";
import { VStack } from "@chakra-ui/react";
import { useEnrolledModalProps } from "../hooks";
import { useRouter } from "next/router";

interface SwiperItemProps {
  id: number;
}
const SwiperItem = ({ id }: SwiperItemProps) => {
  const { ref, isIntersecting } = useIntersectionObserver(false, {
    root: null,
    threshold: 1,
    rootMargin: "100% 0px 100% 0px",
  });
  const { onOpen } = useEnrolledModalProps();
  const router = useRouter();
  return (
    <VStack onClick={() => router.push(`/quiz/${id}`)} width="full">
      <QuizCard
        onOpen={onOpen}
        ref={ref}
        state={CARD_STATE.enroll}
        colored={isIntersecting}
        quizCardInfo={{
          prize: 1200,
          prizeText: "Yours to Win!",
          unitPrize: "USDT",
          values: [
            { id: 0, text: "Aura Authentication" },
            { id: 1, text: "Unitap Pass Owner" },
            { id: 2, text: "Aura Authentication" },
            { id: 3, text: "Unitap Pass Owner" },
            { id: 4, text: "Aura Authentication" },
          ],
          capacity: 1400,
          enrolledNumber: 1378,
          isEnrolled: true,
        }}
      />
    </VStack>
  );
};
const MemoizedSwiperItem = memo(SwiperItem);
export { MemoizedSwiperItem };
