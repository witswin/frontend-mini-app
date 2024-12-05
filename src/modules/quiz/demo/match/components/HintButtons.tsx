/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { HINTS } from '@/types';

import { Widget } from 'solar-icon-set';
import { useDemoQuizData, useDemoQuizDispatch } from '../hooks';

export const HintButton = ({ isDisabled }: { isDisabled?: boolean }) => {
  const selectedHint = useMemo(
    () => ({
      [HINTS.fifty]: {
        headline: '50/50',
        icon: (
          <Widget
            iconStyle="BoldDuotone"
            size={24}
            color={
              isDisabled
                ? 'var(--chakra-colors-gray-40)'
                : 'var(--chakra-colors-blue)'
            }
          />
        ),
      },
    }),
    [isDisabled],
  );

  const demoQuiz = useDemoQuizData();
  const demoQuizDispatch = useDemoQuizDispatch();

  return (
    <>
      <VStack
        p="1px"
        borderRadius="10px"
        as={Button}
        variant="ghost"
        isDisabled={isDisabled}
        _disabled={{
          '&>div': {
            bg: 'glassBackground',
          },
        }}
        _hover={{ bg: 'primaryRadial' }}
        _focus={{ bg: 'primaryRadial' }}
        bg={'primaryRadial'}
        h="52px"
        w="full"
        onClick={() => {
          demoQuizDispatch((prev) => ({
            ...prev,
            builtInHints: [
              {
                ...prev.builtInHints[0],
                isUsed: true,
                questionId: demoQuiz.activeQuestionId,
              },
            ],
          }));
        }}
      >
        <HStack
          bg="gray.700"
          p="8px"
          borderRadius="10px"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          w="full"
          h="full"
        >
          {selectedHint['fifty'].icon}

          <Text
            fontSize="sm"
            fontWeight="700"
            color={isDisabled ? 'gray.400' : 'gray.0'}
          >
            {selectedHint['fifty'].headline}
          </Text>
        </HStack>
      </VStack>
    </>
  );
};
