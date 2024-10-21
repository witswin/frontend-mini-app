import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEnrolledModalProps, useSelectedQuiz } from "../hooks";
import { useMemo, useState } from "react";
import { ENROLL_STATUS } from "../types";
import { QuizInfo } from "./state/QuizInfo";
import { QuizTask } from "./state/QuizTask";
import { QuizEnrolled } from "./state/QuizEnrolled";

export const EnrolledCard = () => {
  const { onClose, isOpen } = useEnrolledModalProps();
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
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />

        <DrawerContent
          width="538px"
          mx="auto"
          borderStartStartRadius="24px"
          borderStartEndRadius="24px"
          borderTop="2px solid"
          borderColor="cyan"
          background="var(--chakra-colors-cardBackground)"
          backdropFilter="blur(50px)"
          boxShadow="0 5px 0px rgb(32,32,51), 1px 0px 0px rgb(32,32,51), -1px 0px 0px rgb(32,32,51)"
          p="16px"
          gap="16px"
        >
          <DrawerCloseButton color="gray.100" />
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
          </HStack>

          <DrawerBody
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },

              "&": {
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              },
            }}
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
                <Text
                  color="gray.60"
                  fontSize="md"
                  width="full"
                  textAlign="center"
                >
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
