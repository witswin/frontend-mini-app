import { Button, Img, Text, useToast, VStack } from "@chakra-ui/react";
import { useEnrolledModalProps, useSelectedQuiz } from "../hooks";
import { useEffect, useMemo, useState } from "react";
import { ENROLL_STATUS } from "../types";
import { QuizInfo } from "./state/QuizInfo";
import { QuizTask } from "./state/QuizTask";
import { QuizEnrolled } from "./state/QuizEnrolled";
import { BottomModal } from "@/components/BottomModal";
import { SelectHint } from "./SelectHint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/configs/axios";
import { useAuth } from "@/hooks/useAuthorization";
import { AxiosError } from "axios";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useCheckEnrolled } from "@/modules/home/hooks";

export const EnrolledCard = () => {
  const { onClose, isOpen } = useEnrolledModalProps();
  const selectedQuiz = useSelectedQuiz();
  const [showHintModal, setShowHintModal] = useState(false);

  const authInfo = useAuth();
  const toast = useToast({
    position: "bottom",
  });

  const [enrollCardState, setEnrollCardState] = useState(
    ENROLL_STATUS.quizInfo
  );

  const { connect, connectors } = useWalletConnection();

  const queryClient = useQueryClient();

  const checkIsEnrolled = useCheckEnrolled();

  useEffect(() => {
    setEnrollCardState(ENROLL_STATUS.enrolled);
  }, [checkIsEnrolled(selectedQuiz?.id)]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axiosClient
        .post(
          "/quiz/competitions/enroll/",
          {
            user_hints: [],
            hint_count: 1,
            competition: 3,
          },
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          }
        )
        .then((res) => console.log(res.data));
    },
    onError: (data: AxiosError<{ detail: string }>) => {
      toast({
        description: data.response.data.detail,
        status: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCompetition"] });
      toast({
        description: `You have enrolled ${selectedQuiz.title}`,
        status: "success",
      });
    },
  });

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
          if (!authInfo?.token) {
            connect({
              connector: connectors.find(
                (connector) => connector.id === "injected"
              )!,
            });
          } else {
            mutate();
          }
          // setEnrollCardState(ENROLL_STATUS.task);
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
