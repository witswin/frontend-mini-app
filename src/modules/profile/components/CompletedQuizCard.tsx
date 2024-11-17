import { Card } from "@/components/Card";
import {
  Badge,
  Box,
  Button,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ConfettiMinimalistic } from "solar-icon-set";

export const CompletedQuizCard = () => {
  const isWinner = true;
  const count = 25;
  const token = "USDC";
  const chain = "Polygon";
  return (
    <Card position="relative">
      {isWinner && (
        <Badge
          variant="primary"
          size="md"
          display="flex"
          alignItems="center"
          position="absolute"
          top="16px"
          right="16px"
        >
          <ConfettiMinimalistic iconStyle="Bold" size={16} color="gray.0" />
        </Badge>
      )}

      <Img rounded="full" boxSize="64px" src={"quiz?.image"} />

      <VStack gap="4px">
        <Text color="gray.0" fontSize="md" fontWeight="600" textAlign="center">
          {/* {quiz?.title} */}
          quiz title
        </Text>
        <Text color="gray.60" fontSize="sm" fontWeight="500" textAlign="center">
          Sep 24 . 16:30
        </Text>
      </VStack>

      {isWinner && (
        <HStack
          w="full"
          bg="glassBackground"
          borderRadius="8px"
          p="8px"
          pl="12px"
          justifyContent="space-between"
        >
          <HStack gap="8px">
            <Box boxSize="28px" borderRadius="50px" bg="yellow" />

            <HStack gap="4px">
              <Text fontSize="lg" fontWeight={600} color="gray.0">
                {count}
              </Text>
              <Text
                fontSize="sm"
                fontWeight={600}
                color="gray.40"
              >{`${token} on ${chain}`}</Text>
            </HStack>
          </HStack>

          <Button variant="outline" size="mini">
            {true ? "Claim" : "Claimed"}
          </Button>
        </HStack>
      )}
    </Card>
  );
};
