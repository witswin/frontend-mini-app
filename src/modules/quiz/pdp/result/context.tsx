import { quizFinishedData, quizStats } from "@/globalTypes";
import { useAuth } from "@/hooks/useAuthorization";
import { useWebSocket } from "@/hooks/useWebSocket";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const  QuizFinishedInfo = createContext<{
  finishedData: quizFinishedData[];
  quizStats: quizStats;
  winner: quizFinishedData;
}>({
  finishedData: null,
  quizStats: null,
  winner: null,
});

interface QuizFinishedInfoProviderProps extends PropsWithChildren {}

export const QuizFinishedInfoProvider = ({
  children,
}: QuizFinishedInfoProviderProps) => {
  const [state, setState] = useState<{
    finishedData: quizFinishedData[];
    quizStats: quizStats;
    winner: quizFinishedData;
  }>();

  const { socket } = useWebSocket();

  const authInfo = useAuth();

  const winner = state?.finishedData?.find((user) => user.pk === authInfo?.pk);


  useEffect(() => {
    setState((prev) => ({ ...prev, winner }));
  }, [winner]);

  useEffect(() => {
    if (!socket.current.client) return;
    const handleMessage = (e: MessageEvent) => {
      if (e.data !== "PONG") {
        const data = JSON.parse(e.data);
        if (data.type === "quiz_finish") {
          setState((prev) => ({
            ...prev,
            finishedData: data?.winnersList,
          }));
        }
        if (data.type === "quiz_stats") {
          setState((prev) => ({
            ...prev,
            quizStats: data?.data,
          }));
        }
      }
    };
    socket.current.client.addEventListener("message", handleMessage);
    return () => {
      socket.current.client?.removeEventListener("message", handleMessage);
    };
  }, [socket?.current?.client]);

  console.log({ state });

  return (
    <QuizFinishedInfo.Provider value={state}>
      {children}
    </QuizFinishedInfo.Provider>
  );
};
