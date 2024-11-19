/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, GridItem, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PrizeCard } from "../components/PrizeCard";
import { QuizWinners } from "../components/QuizWinners";
import { useFinishedData } from "../hooks";

export const Result = () => {
  const [isLoading, setLoading] = useState(true);

  const finishedDataInfo = useFinishedData();

  useEffect(() => {
    if (
      finishedDataInfo?.quizStats &&
      finishedDataInfo?.finishedData &&
      isLoading
    ) {
      setLoading(false);
    }
  }, [finishedDataInfo, isLoading]);

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
          gridTemplateRows={
            !!finishedDataInfo?.winner ? "fit-content 1fr" : "1fr"
          }
          w="full"
          h="full"
          mb="16px"
        >
          {!!finishedDataInfo?.winner && (
            <GridItem>
              <PrizeCard
                prizeCount={
                  finishedDataInfo?.quizStats?.prizeToWin
                    ? finishedDataInfo?.quizStats?.prizeToWin / 1e18
                    : 0
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
            >{`Total prize had divided between ${finishedDataInfo?.finishedData?.length} winners.`}</Text>
            <Box height="full" overflowY="auto">
              <QuizWinners finishedData={finishedDataInfo?.finishedData} />
            </Box>
          </GridItem>
        </Grid>
      )}
    </VStack>
  );
};
