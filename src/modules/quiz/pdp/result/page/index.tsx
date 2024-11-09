import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { PrizeCard } from "../components/PrizeCard";
import { QuizWinners } from "../components/QuizWinners";

export const Result = () => {
  const winnersCount = 10;

  const isSpectator = false;
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
      <Grid
        rowGap={{ base: "8px", sm: "16px" }}
        gridTemplateRows={!isSpectator ? "fit-content 1fr" : "1fr"}
        w="full"
        h="full"
        mb="16px"
      >
        {!isSpectator && (
          <GridItem>
            <PrizeCard prizeCount={200} />
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
          >{`Total prize had divided between ${
            !!winnersCount && winnersCount
          } winners.`}</Text>
          <Box height="full" overflowY="auto">
            <QuizWinners />
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  );
};
