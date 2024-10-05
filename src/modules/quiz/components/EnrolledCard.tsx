import { Box, Button, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useEnrolledModalProps, useSelectedQuiz } from "../hooks";
import { CloseIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ENROLL_STATUS } from "../types";
import { QuizInfo } from "./state/QuizInfo";
import { QuizTask } from "./state/QuizTask";
import { QuizEnrolled } from "./state/QuizEnrolled";

export const EnrolledCard = () => {
  const { onClose } = useEnrolledModalProps();
  const selectedQuiz = useSelectedQuiz();

  const [enrollCardState, setEnrollCardState] = useState(
    ENROLL_STATUS.quizInfo
  );

  const stateComponents = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: <QuizInfo />,
      [ENROLL_STATUS.task]: <QuizTask />,
      [ENROLL_STATUS.enrolled]: <QuizEnrolled />,
    };
  }, []);
  const stateTitle = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: "Enroll Quiz",
      [ENROLL_STATUS.task]: "Check Requirements",
      [ENROLL_STATUS.enrolled]: "You're Enrolled! Get Ready for the Quiz",
    };
  }, []);
  const button = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: {
        title: "Enroll",
        onClick: () => {
          setEnrollCardState(ENROLL_STATUS.task);
        },
      },
      [ENROLL_STATUS.task]: {
        title: "Submit Enrollment",
        onClick: () => {
          setEnrollCardState(ENROLL_STATUS.enrolled);
        },
      },
      [ENROLL_STATUS.enrolled]: {
        title: "Dive into Resources",
        onClick: () => {},
      },
    };
  }, []);

  return (
    <>
      <Box
        width="full"
        position="absolute"
        height="full"
        background="gray.700"
        zIndex="1"
        opacity="0.6"
      />
      <motion.div
        style={{
          alignItems: "center",
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          borderStartStartRadius: "24px",
          borderStartEndRadius: "24px",
          borderEndEndRadius: "16px",
          borderEndStartRadius: "16px",
          borderTop: "2px solid",
          borderColor: "cyan",
          background: "var(--chakra-colors-cardBackground)",
          backdropFilter: "blur(50px)",
          margin: 0,
          bottom: "0",
          marginTop: "auto !important",
          position: "absolute",
          left: "0",
          zIndex: "2",
          width: "100%",
          padding: "16px",
          boxShadow:
            "0 5px 0px rgb(32,32,51), 1px 0px 0px rgb(32,32,51), -1px 0px 0px rgb(32,32,51)",
          columnGap: "16px",
          rowGap: "16px",
        }}
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.85 }}
      >
        <HStack width="full">
          <Text
            fontFamily="kanit"
            fontSize="2xl"
            fontWeight="600"
            textAlign="center"
            width="full"
            color="gray.0"
            lineHeight="28px"
            maxWidth="199px"
            mx="auto"
          >
            {stateTitle[enrollCardState]}
          </Text>
          <CloseIcon
            onClick={onClose}
            cursor="pointer"
            fontSize="12px"
            position="absolute"
            right="16px"
            top="23px"
          />
        </HStack>
        <Img
          mt="8px"
          rounded="full"
          src={selectedQuiz?.image}
          boxSize="106px"
          alt={selectedQuiz?.title}
        />
        <VStack width="full">
          <Text
            color="gray.0"
            fontSize="lg"
            lineHeight="24px"
            fontWeight="700"
            width="full"
            textAlign="center"
          >
            {selectedQuiz?.title}
          </Text>
          <Text color="gray.60" fontSize="md" width="full" textAlign="center">
            {selectedQuiz?.details}
          </Text>
        </VStack>
        <AnimatePresence>{stateComponents[enrollCardState]}</AnimatePresence>
        <Button
          width="full"
          onClick={button[enrollCardState].onClick}
          variant="solid"
        >
          {button[enrollCardState].title}
        </Button>
      </motion.div>
    </>
  );
};
