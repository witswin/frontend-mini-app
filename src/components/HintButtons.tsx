/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { HINTS } from "@/types";
import {
  useCounterDispatch,
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
  const { question } = useQuestionData();

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
    if (socket) {
      console.log("rebderkdlashodihasoidhq");
      socket.current.client.onmessage = (e: any) => {
        if (e.data !== "PONG") {
          const data = JSON.parse(e.data);
          
          if(data.type==="hint_question"){
            console.log(data);
            
          }
        }
      };
    }
    // {
    //   "type": "hint_question",
    //   "data": [14, 15],
    //   "questionId": 4,
    //   "hintType": "fifty"
    // }
    // if (hint.type === HINTS.time) {
    //   setShowExtraTime(true);
    //   counterDispatch((prev) => prev + 3);
    // }
    // hintDispatch((prev) => ({
    //   ...prev,
    //   usedHints: [
    //     ...prev.usedHints,
    //     {
    //       hintType: hint.type,
    //       hintId: hint.localId  ,
    //       questionId: question.id,
    //     },
    //   ],
    // }));
  }, []);

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

          // if (hint.type === HINTS.time) {
          //   setShowExtraTime(true);
          //   counterDispatch((prev) => prev + 3);
          // }
          // hintDispatch((prev) => ({
          //   ...prev,
          //   usedHints: [
          //     ...prev.usedHints,
          //     {
          //       hintType: hint.type,
          //       hintId: hint.localId  ,
          //       questionId: question.id,
          //     },
          //   ],
          // }));
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
