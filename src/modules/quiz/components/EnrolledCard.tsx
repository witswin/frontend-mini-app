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
import { useCheckEnrolled } from "@/modules/home/hooks";
import { useHints } from "@/modules/question/hooks";
import { useRouter } from "next/router";

export const EnrolledCard = () => {
  const router = useRouter();
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

  const queryClient = useQueryClient();

  const checkIsEnrolled = useCheckEnrolled();

  useEffect(() => {
    if (checkIsEnrolled(selectedQuiz?.id)) {
      setEnrollCardState(ENROLL_STATUS.enrolled);
    } else {
      setEnrollCardState(ENROLL_STATUS.quizInfo);
    }
  }, [checkIsEnrolled(selectedQuiz?.id)]);

  const hints = useHints();
  const userHints = hints?.selectedHints?.map((hint) => hint.id);

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axiosClient
        .post(
          "/quiz/competitions/enroll/",
          {
            user_hints: userHints,
            competition: selectedQuiz?.id,
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
          // if (!authInfo?.token) {
          //   connect();
          // } else {
          //   mutate();
          // }
          mutate();

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
        title:
          selectedQuiz?.resources.length === 0
            ? "Go to quiz lobby"
            : "Dive into Resources",
        onClick: () => {
          if (selectedQuiz?.resources.length === 0) {
            router.push(`/quiz/${router.query?.id ?? selectedQuiz?.id}/match`);
          } else {
            router.push(
              `/quiz/${router.query?.id ?? selectedQuiz?.id}/resources`
            );
          }
        },
      },
    };
  }, [authInfo,selectedQuiz]);



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
