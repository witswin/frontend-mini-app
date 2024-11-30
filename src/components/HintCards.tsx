import { Box, Card, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { HINTS } from '@/types';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AlarmAdd, UsersGroupTwoRounded, Widget } from 'solar-icon-set';
import { useHintsDispatch } from '@/modules/question/hooks';
import { selectedHint } from '@/modules/question/types';

export const HintCard = ({
  hint,
  setHintModal,
}: {
  hint: selectedHint;
  setHintModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const setHints = useHintsDispatch();
  const [isSmall] = useMediaQuery('(min-width: 415px)');

  const isHintCardEmpty = hint === undefined;

  const selectedHint = useMemo(
    () => ({
      [HINTS.fifty]: {
        headline: '50/50',
        subHeadline: 'Remove 2 Answers',
        icon: (
          <Widget
            iconStyle="BoldDuotone"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
      },
      [HINTS.time]: {
        headline: 'Extra Time',
        subHeadline: '3 More Seconds',
        icon: (
          <AlarmAdd
            iconStyle="Bold"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
      },
      [HINTS.stats]: {
        headline: 'Audience Poll',
        subHeadline: 'See Others Answers',
        icon: (
          <UsersGroupTwoRounded
            iconStyle="Bold"
            size={32}
            color="var(--chakra-colors-blue)"
          />
        ),
      },
    }),
    [],
  );

  return (
    <Card
      bg="glassBackground"
      p="8px"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      gap="8px"
      h="102px"
      w="full"
      {...(isHintCardEmpty && {
        onClick: () => {
          setHintModal(true);
        },
      })}
      cursor={isHintCardEmpty ? 'pointer' : 'default'}
    >
      {isHintCardEmpty ? (
        <AddIcon color="blue" boxSize="32px" fontSize="32px" />
      ) : (
        <>
          <Box
            position="absolute"
            top="9px"
            right="9px"
            color="gray.60"
            onClick={(e) => {
              e.stopPropagation();
              setHints((prevState) => ({
                ...prevState,
                selectedHints: prevState.selectedHints.filter(
                  (h) => h.localId !== hint.localId,
                ),
              }));
            }}
            cursor="pointer"
          >
            <CloseIcon color="gray.60" />
          </Box>

          {selectedHint[hint.type].icon}

          <VStack gap="2px" w="full">
            <Text fontSize={isSmall ? 'lg' : 'sm'} color="gray.0">
              {selectedHint[hint.type]?.headline}
            </Text>
            <Text
              fontSize={isSmall ? 'sm' : 'xs'}
              color="gray.60"
              textAlign="center"
            >
              {selectedHint[hint.type]?.subHeadline}
            </Text>
          </VStack>
        </>
      )}
    </Card>
  );
};
