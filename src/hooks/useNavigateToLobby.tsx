import { useGetCardState, useSelectedQuiz } from '@/modules/quiz/hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useCheckEnrolled } from '@/modules/home/hooks';
import { CARD_STATE } from '@/types';

export const useNavigateToLobby = () => {
  const router = useRouter();

  const selectedQuiz = useSelectedQuiz();


  const checkIsEnrolled = useCheckEnrolled();

  const cardState = useGetCardState(selectedQuiz);

  const isEnrolled = useMemo(
    () => checkIsEnrolled(selectedQuiz?.id),
    [checkIsEnrolled, selectedQuiz?.id],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        isEnrolled &&
        (cardState === CARD_STATE.lobby || cardState === CARD_STATE.join) &&
        new Date(selectedQuiz?.startAt).getTime() - new Date().getTime() <=
          60000
      ) {
        router.push(`/quiz/${selectedQuiz?.id}/match`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cardState, isEnrolled, selectedQuiz?.id]);
};
