/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { HINTS } from "@/types";
import {
  useCounterDispatch,
  useHints,
  useHintsDispatch,
  useQuestionData,
} from "@/modules/question/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set";
import { selectedHint } from "@/modules/question/types";
import { useWebSocket } from "@/hooks/useWebSocket";

export const HintButton = ({
  hint,
  isDisabled,
}: {
  hint: selectedHint;
  isDisabled?: boolean;
}) => {
  const hintDispatch = useHintsDispatch();
  const counterDispatch = useCounterDispatch();
  const { question, quiz } = useQuestionData();

  const isUsedTimeHint = useHints().usedHints.find(
    (item) =>
      item.hintType === HINTS.time &&
      item.questionId === question.id &&
      item.hintId === hint.localId
  );

  const selectedHint: {
    [key in HINTS]: {
      headline: string;
      icon: JSX.Element;
    };
  } = useMemo(
    () => ({
      [HINTS.fifty]: {
        headline: "50/50",
        icon: (
          <Widget
            iconStyle="BoldDuotone"
            size={24}
            color={
              isDisabled
                ? "var(--chakra-colors-gray-40)"
                : "var(--chakra-colors-blue)"
            }
          />
        ),
      },
      [HINTS.time]: {
        headline: "Extra Time",
        icon: (
          <AlarmAdd
            iconStyle="Bold"
            size={24}
            color={
              isDisabled
                ? "var(--chakra-colors-gray-40)"
                : "var(--chakra-colors-blue)"
            }
          />
        ),
      },
      [HINTS.stats]: {
        headline: "Audience Poll",
        icon: (
          <UsersGroupTwoRounded
            iconStyle="Bold"
            size={24}
            color={
              isDisabled
                ? "var(--chakra-colors-gray-40)"
                : "var(--chakra-colors-blue)"
            }
          />
        ),
      },
    }),
    [isDisabled]
  );
  const [showExtraTime, setShowExtraTime] = useState(false);

  useEffect(() => {
    if (showExtraTime) {
      setTimeout(() => {
        setShowExtraTime(false);
      }, 2000);
    }
  }, [showExtraTime]);

  const { socket } = useWebSocket();

  useEffect(() => {
    if (question?.selectedChoice && isUsedTimeHint) {
      socket.current.client?.send(
        JSON.stringify({
          command: "GET_HINT",
          args: {
            questionId: question?.id,
            hintType: hint.type,
            hintId: String(hint.id),
            selectedChoiceId: question?.selectedChoice,
          },
        })
      );
    }
  }, [
    hint.id,
    hint.type,
    isUsedTimeHint,
    question?.id,
    question?.selectedChoice,
    socket,
  ]);

  return (
    <>
      <VStack
        p="1px"
        borderRadius="10px"
        as={Button}
        variant="ghost"
        isDisabled={isDisabled}
        _disabled={{
          "&>div": {
            bg: "glassBackground",
          },
        }}
        _hover={{ bg: "primaryRadial" }}
        _focus={{ bg: "primaryRadial" }}
        bg={"primaryRadial"}
        h="52px"
        w="full"
        onClick={() => {
          socket.current.client?.send(
            JSON.stringify({
              command: "GET_HINT",
              args: {
                questionId: question?.id,
                hintType: hint.type,
                hintId: String(hint.id),
              },
            })
          );

          hintDispatch((prev) => ({
            ...prev,
            usedHints: [
              ...prev.usedHints,
              {
                hintType: hint.type,
                hintId: hint.localId,
                questionId: question.id,
                dbId: hint.id,
              },
            ],
          }));

          if (hint.type === HINTS.time) {
            setShowExtraTime(true);
            counterDispatch((prev) => prev + quiz?.questionHintTimeSeconds);
          }
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
          {selectedHint[hint.type].icon}

          <Text
            fontSize="sm"
            fontWeight="700"
            color={isDisabled ? "gray.400" : "gray.0"}
          >
            {selectedHint[hint.type].headline}
          </Text>
        </HStack>
      </VStack>
      <AnimatePresence>
        {hint.type === HINTS.time && showExtraTime && (
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundImage: "var(--chakra-colors-primaryRadial)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -100, -200],
              x: [0, -20, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 2, ease: "linear" }}
          >
            <Text fontWeight="600" color="gray.0" fontSize="md">
              +3 s
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
