/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  GridItem,
  Img,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PrizeCard } from '../components/PrizeCard';
import { QuizWinners } from '../components/QuizWinners';
import { useFinishedData } from '../hooks';

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

  const isJustSelfUserWinner =
    finishedDataInfo?.finishedData?.length === 1 && finishedDataInfo?.winner;

  const isEmptyWinnerList = finishedDataInfo?.finishedData?.length === 0;

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
          rowGap={{ base: '8px', sm: '16px' }}
          gridTemplateRows={
            !!finishedDataInfo?.winner ? 'fit-content 1fr' : '1fr'
          }
          w="full"
          h="full"
          mb="16px"
        >
          {/* {!!finishedDataInfo?.winner && ( */}
          <GridItem>
            <PrizeCard
              isSelfWinner={!!isJustSelfUserWinner}
              prizeCount={
                finishedDataInfo?.quizStats?.prizeToWin
                  ? finishedDataInfo?.quizStats?.prizeToWin / 1e6
                  : 0
              }
            />
          </GridItem>
          {/* )} */}
          {!isJustSelfUserWinner && (
            <GridItem
              p={{ base: '8px', sm: '16px' }}
              bg="glassBackground"
              borderRadius="16px"
              h="full"
              overflowY="hidden"
            >
              {isEmptyWinnerList ? (
                <VStack rowGap="4px" justifyContent="center" height="full">
                  <Img mb="12px" src="/assets/images/result/no-winner.svg" />
                  <Text
                    color="gray.0"
                    fontWeight="700"
                    fontFamily="Kanit"
                    fontSize="19px"
                  >
                    No Winners This Time!
                  </Text>
                  <Text
                    color="gray.60"
                    fontWeight="600"
                    lineHeight="20px"
                    fontSize="13px"
                    textAlign="center"
                    width="full"
                  >
                    Tough quiz! Nobody won, but don&apos;t lose heart.See you in
                    the next one!
                  </Text>
                </VStack>
              ) : (
                <>
                  <Text
                    width="full"
                    textAlign="center"
                    fontSize={{ base: 'xl', sm: '2xl' }}
                    fontWeight={500}
                    color="gray.0"
                  >
                    Quiz Winners
                  </Text>
                  <Text
                    my={{ base: '4px', sm: '16px' }}
                    width="full"
                    textAlign="center"
                    fontSize="sm"
                    fontWeight={500}
                    color="gray.60"
                  >{`Total prize had divided between ${finishedDataInfo?.finishedData?.length} winners.`}</Text>
                  <Box height="full" overflowY="auto">
                    <QuizWinners
                      finishedData={finishedDataInfo?.finishedData}
                    />
                  </Box>
                </>
              )}
            </GridItem>
          )}
        </Grid>
      )}
    </VStack>
  );
};
