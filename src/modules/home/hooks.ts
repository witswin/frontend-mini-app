import { axiosClient } from '@/configs/axios';
import { LOBBY_THRESHOLD } from '@/constants';
import { enrolledCompetition, quizType } from '@/globalTypes';
import { useAuth } from '@/hooks/useAuthorization';
import { INFO_CARD_STATE } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useCheckEnrolled = () => {
  const authInfo = useAuth();

  const { data: enrolledCompetitions } = useQuery({
    queryKey: ['enrolledCompetition', authInfo?.token],
    queryFn: async () =>
      await axiosClient
        .get<string, AxiosResponse<enrolledCompetition[]>>(
          '/quiz/competitions/enroll/',
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          },
        )
        .then((res) => res.data),
    enabled: !!authInfo?.token,
  });

  if (!authInfo?.token) {
    return () => {};
  }

  return (competitionId: number | string) =>
    enrolledCompetitions?.find(
      (competition) => competition.competition === competitionId,
    );
};

export const useGetHomeCardState = (competition: quizType) => {
  const enrolledChecker = useCheckEnrolled();

  const [competitionState, setCompetitionState] =
    useState<INFO_CARD_STATE>(undefined);
  const [timeState, setTimeState] = useState(undefined);

  const convertedStartAt = new Date(competition?.startAt).getTime();

  const isEnrolled = enrolledChecker(competition?.id);

  // const leftTimeCalculator = useCalculateStartUTCTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const calculatedTime = convertedStartAt - new Date().getTime();
      if (calculatedTime > LOBBY_THRESHOLD) {
        setTimeState('default');
      } else if (calculatedTime <= LOBBY_THRESHOLD && calculatedTime > 10000) {
        setTimeState('lobby');
      } else if (calculatedTime <= 10000 && calculatedTime >= 0) {
        setTimeState('close');
      } else {
        setTimeState('expired');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isEnrolled) {
      setCompetitionState(INFO_CARD_STATE.welcome);
    } else {
      if (timeState === 'default' && competition.resources.length !== 0) {
        setCompetitionState(INFO_CARD_STATE.resource);
      } else if (timeState === 'lobby') {
        setCompetitionState(INFO_CARD_STATE.lobby);
      } else if (timeState === 'close') {
        setCompetitionState(INFO_CARD_STATE.join);
      } else if (competition.isFinished) {
        setCompetitionState(INFO_CARD_STATE.welcome);
      } else {
        setCompetitionState(INFO_CARD_STATE.watch);
      }
    }
  }, [timeState, isEnrolled]);

  return competitionState;
};
