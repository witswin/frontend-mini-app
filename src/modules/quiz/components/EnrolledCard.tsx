import { Button, Img, Text, VStack } from "@chakra-ui/react";
import { useEnrolledModalProps, useSelectedQuiz } from "../hooks";
import { useMemo, useState } from "react";
import { ENROLL_STATUS } from "../types";
import { QuizInfo } from "./state/QuizInfo";
import { QuizTask } from "./state/QuizTask";
import { QuizEnrolled } from "./state/QuizEnrolled";
import { BottomModal } from "@/components/BottomModal";
import { SelectHint } from "./SelectHint";

export const EnrolledCard = () => {
  const { onClose, isOpen } = useEnrolledModalProps();
  const selectedQuiz = useSelectedQuiz();
  const [showHintModal, setShowHintModal] = useState(false);

  const [enrollCardState, setEnrollCardState] = useState(
    ENROLL_STATUS.quizInfo
  );

  const stateComponents = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: <QuizInfo setHintModal={setShowHintModal} />,
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
    <BottomModal
      onClose={onClose}
      isOpen={isOpen}
      title={stateTitle[enrollCardState]}
    >
      <VStack gap="24px">
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

        {stateComponents[enrollCardState]}

        <Button
          width="full"
          onClick={button[enrollCardState].onClick}
          variant="solid"
        >
          {button[enrollCardState].title}
        </Button>
      </VStack>

      <SelectHint isOpen={showHintModal} setIsOpen={setShowHintModal} />
    </BottomModal>
  );
};
