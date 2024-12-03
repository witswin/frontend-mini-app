import { memo, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { VStack } from '@chakra-ui/react';
import {
  useEnrolledModalProps,
  useGetCardState,
  useSelectedQuizDispatch,
} from '../hooks';
import { useRouter } from 'next/router';
import { quizType } from '@/globalTypes';
import { MemoizedDemoQuizCard } from '@/components/DemoQuizCard';

interface SwiperItemProps {
  quiz: quizType;
}

const SwiperItem = ({ quiz }: SwiperItemProps) => {
  const selectedQuizDispatch = useSelectedQuizDispatch();
  const { ref, isIntersecting } = useIntersectionObserver(false, {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px 100% 0px',
  });
  const { onOpen } = useEnrolledModalProps();
  const router = useRouter();

  const cardState = useGetCardState(quiz);

  useEffect(() => {
    if (isIntersecting) {
      selectedQuizDispatch(quiz);
    }
  }, [isIntersecting]);

  return (
    <VStack onClick={() => router.push(`/quiz/${quiz?.id}`)} width="full">
      <MemoizedDemoQuizCard
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
const MemoizedSwiperDemoItem = memo(SwiperItem);
export { MemoizedSwiperDemoItem };
