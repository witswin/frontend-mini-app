import { QUESTION_STATE } from "@/types";
import { HStack, StackProps, Text } from "@chakra-ui/react";
import { CSSProperties, useMemo } from "react";
import { Progress } from "./Progress";
import { AnimatePresence, motion } from "framer-motion";
import { Alarm } from "solar-icon-set";
import { useQuestionData } from "@/modules/question/hooks";

interface TimeCounterProps extends CSSProperties {
  count: number;
}
const TimerCounter = ({ count, ...cssProps }: TimeCounterProps) => {
  return (
    <HStack height="full" overflow="hidden" width="50px" position="relative">
      <AnimatePresence>
        <motion.p
          key={count}
          initial={{ y: 30, backgroundClip: "text" }}
          animate={{ y: 0 }}
          exit={{ y: -30, opacity: 0 }}
          style={{
            position: "absolute",
            top: "3px",
            left: "0",
            zIndex: "0",
            ...cssProps,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: 17,
            fontWeight: "700",
          }}
          transition={{ duration: 1 }}
        >
          {count.toLocaleString("default", { minimumIntegerDigits: 2 })}
        </motion.p>
        <Text
          ml="24px"
          background={cssProps.background as string}
          backgroundClip="text"
          fontSize="md"
          fontWeight="700"
          sx={{ WebkitTextFillColor: "transparent" }}
        >
          s
        </Text>
      </AnimatePresence>
    </HStack>
  );
};

interface ProgressTimerProps extends StackProps {
  hasIcon?: boolean;
  hasCounter?: boolean;
  timer: number;
  state: QUESTION_STATE;
}
export const ProgressTimer = ({
  hasCounter,
  hasIcon,
  state,
  timer,
  ...otherProps
}: ProgressTimerProps) => {
  const questionData = useQuestionData();
  const progressBg = useMemo(
    () => ({
      [QUESTION_STATE.default]: "progressDefaultLinear",
      [QUESTION_STATE.answered]: "gray-100",
      [QUESTION_STATE.alert]: "progressAlertLinear",
      [QUESTION_STATE.freeze]: "gray-100",
    }),
    []
  );
  const color = useMemo(
    () => ({
      [QUESTION_STATE.default]: "var(--chakra-colors-blue)",
      [QUESTION_STATE.answered]: "var(--chakra-colors-gray-100)",
      [QUESTION_STATE.alert]: "var(--chakra-colors-red-400)",
      [QUESTION_STATE.freeze]: "var(--chakra-colors-gray-100)",
    }),
    []
  );

  return (
    state !== QUESTION_STATE.rest && (
      <HStack
        height="30px"
        position="relative"
        columnGap="8px"
        width="full"
        {...otherProps}
      >
        {hasIcon && <Alarm size={28} iconStyle="Bold" color={color[state]} />}
        <Progress
          value={(timer * 100) / questionData.quiz.questionTimeSeconds}
          filledTrack={{
            bg: `var(--chakra-colors-${progressBg[state]})`,
          }}
          track={{
            bg: `var(--chakra-colors-${progressBg[state]})`,
          }}
        />
        {hasCounter && (
          <TimerCounter
            background={`var(--chakra-colors-${progressBg[state]})`}
            count={timer}
          />
        )}
      </HStack>
    )
  );
};
