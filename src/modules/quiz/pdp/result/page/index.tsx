/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, GridItem, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PrizeCard } from "../components/PrizeCard";
import { QuizWinners } from "../components/QuizWinners";
import { useWebSocket } from "@/hooks/useWebSocket";
import { quizFinishedData } from "@/globalTypes";
import { useAuth } from "@/hooks/useAuthorization";

export const Result = () => {
  const { socket } = useWebSocket();

  const authInfo = useAuth();
  const [finishedData, setFinishedData] = useState<quizFinishedData[]>(null);
  const isWinner = finishedData?.find((user) => user.pk === authInfo?.pk);
  const [quizStats, setQuizStats] = useState(null);

  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    if (quizStats && finishedData && isLoading) {
      setLoading(false);
    }
  }, [finishedData, quizStats, isLoading]);

  useEffect(() => {
    if (!socket.current.client) return;
    const handleMessage = (e: MessageEvent) => {
      if (e.data !== "PONG") {
        const data = JSON.parse(e.data);
        if (data.type === "quiz_finish") {
          setFinishedData(data?.winnersList);
        }
        if (data.type === "quiz_stats") {
          setQuizStats(data.data);
        }
      }
    };
    socket.current.client.addEventListener("message", handleMessage);
    return () => {
      socket.current.client?.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  return (
    <VStack
      flexDir="column"
      w="full"
      gap="16px"
      height="100vh"
      position="relative"
      pb="80px"
      overflow="hidden"
    >
      {isLoading ? (
        <VStack justifyContent="center" height="full">
          <Spinner size="lg" color="blue" />
        </VStack>
      ) : (
        <Grid
          rowGap={{ base: "8px", sm: "16px" }}
          gridTemplateRows={!!isWinner ? "fit-content 1fr" : "1fr"}
          w="full"
          h="full"
          mb="16px"
        >
          {!!isWinner && (
            <GridItem>
              <PrizeCard
                prizeCount={
                  quizStats?.prizeToWin ? quizStats?.prizeToWin / 1e18 : 0
                }
              />
            </GridItem>
          )}
          <GridItem
            p={{ base: "8px", sm: "16px" }}
            bg="glassBackground"
            borderRadius="16px"
            h="full"
            overflowY="hidden"
          >
            <Text
              width="full"
              textAlign="center"
              fontSize={{ base: "xl", sm: "2xl" }}
              fontWeight={500}
              color="gray.0"
            >
              Quiz Winners
            </Text>
            <Text
              my={{ base: "4px", sm: "16px" }}
              width="full"
              textAlign="center"
              fontSize="sm"
              fontWeight={500}
              color="gray.60"
            >{`Total prize had divided between ${finishedData?.length} winners.`}</Text>
            <Box height="full" overflowY="auto">
              <QuizWinners finishedData={finishedData} />
            </Box>
          </GridItem>
        </Grid>
      )}
    </VStack>
  );
};
