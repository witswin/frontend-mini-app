import {
  Button,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEnrolledModalProps, useSelectedQuiz } from '../hooks';
import { useEffect, useMemo, useState } from 'react';
import { ENROLL_STATUS } from '../types';
import { QuizInfo } from './state/QuizInfo';
import { QuizTask } from './state/QuizTask';
import { QuizEnrolled } from './state/QuizEnrolled';
import { BottomModal } from '@/components/BottomModal';
import { SelectHint } from './SelectHint';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/configs/axios';
import { useAuth } from '@/hooks/useAuthorization';
import { AxiosError } from 'axios';
import { useCheckEnrolled } from '@/modules/home/hooks';
import { useHints } from '@/modules/question/hooks';
import { useRouter } from 'next/router';
import { QuizPrivate } from './state/QuizPrivate';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

export const EnrolledCard = () => {
  const router = useRouter();
  const { onClose, isOpen } = useEnrolledModalProps();
  const selectedQuiz = useSelectedQuiz();
  const [showHintModal, setShowHintModal] = useState(false);

  const methods = useForm<{ invitationCode: string }>({ mode: 'onSubmit' });

  const formData = useWatch({ control: methods.control });

  const isPrivate = selectedQuiz?.isVip;

  const authInfo = useAuth();
  const toast = useToast({
    position: 'bottom',
  });

  const [enrollCardState, setEnrollCardState] = useState(
    isPrivate ? ENROLL_STATUS.private : ENROLL_STATUS.quizInfo,
  );

const queryClient = useQueryClient();

  const checkIsEnrolled = useCheckEnrolled();

  useEffect(() => {
    if (checkIsEnrolled(selectedQuiz?.id)) {
      setEnrollCardState(ENROLL_STATUS.enrolled);
    } else {
      if (isPrivate) {
        setEnrollCardState(ENROLL_STATUS.private);
      } else {
        setEnrollCardState(ENROLL_STATUS.quizInfo);
      }
    }
  }, [checkIsEnrolled(selectedQuiz?.id), isPrivate]);

  const hints = useHints();
  const userHints = hints?.selectedHints?.map((hint) => hint.id);

  const { query } = useRouter();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (selectedQuiz?.isVip) {
        return await axiosClient.post(
          '/quiz/competitions/enroll/',
          {
            user_hints: userHints,
            competition: selectedQuiz?.id,
            referral_code: formData?.invitationCode,
          },
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          },
        );
      }
      return await axiosClient.post(
        '/quiz/competitions/enroll/',
        {
          user_hints: userHints,
          competition: selectedQuiz?.id,
        },
        {
          headers: {
            Authorization: `TOKEN ${authInfo?.token}`,
          },
        },
      );
    },
    onError: (data: AxiosError<{ detail: string }>) => {
      toast({
        description: data.response.data.detail,
        status: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrolledCompetition'] });
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', query?.id] });
      toast({
        description: `You have enrolled ${selectedQuiz.title}`,
        status: 'success',
      });
    },
  });

  const stateComponents = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: <QuizInfo setHintModal={setShowHintModal} />,
      [ENROLL_STATUS.private]: (
        <QuizPrivate setEnrollCardState={setEnrollCardState} />
      ),
      [ENROLL_STATUS.task]: <QuizTask />,
      [ENROLL_STATUS.enrolled]: <QuizEnrolled />,
    };
  }, []);


  const stateTitle = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: 'Enroll Quiz',
      [ENROLL_STATUS.private]: 'Enter VIP Invitation Code',
      [ENROLL_STATUS.task]: 'Check Requirements',
      [ENROLL_STATUS.enrolled]: "You're Enrolled! Get Ready for the Quiz",
    };
  }, []);

  const button = useMemo(() => {
    return {
      [ENROLL_STATUS.quizInfo]: {
        title: 'Enroll',
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
        title: 'Submit Enrollment',
        onClick: () => {
          setEnrollCardState(ENROLL_STATUS.enrolled);
        },
      },
      [ENROLL_STATUS.private]: {
        title: 'Submit',
        onClick: () => {
          setEnrollCardState(ENROLL_STATUS.quizInfo);
        },
      },
      [ENROLL_STATUS.enrolled]: {
        title:
          selectedQuiz?.resources.length === 0
            ? 'Go to quiz lobby'
            : 'Dive into Resources',
        onClick: () => {
          if (selectedQuiz?.resources.length === 0) {
            router.push(`/quiz/${router.query?.id ?? selectedQuiz?.id}/match`);
          } else {
            router.push(
              `/quiz/${router.query?.id ?? selectedQuiz?.id}/resources`,
            );
          }
        },
      },
    };
  }, [authInfo, selectedQuiz]);

  return (
    <FormProvider {...methods}>
      {isPrivate && enrollCardState === ENROLL_STATUS.private ? (
        <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            p="0"
            background="var(--chakra-colors-cardBackground)"
            width="538px"
            backdropFilter="blur(50px)"
            borderStartStartRadius="24px"
            borderStartEndRadius="24px"
            borderEndStartRadius="12px"
            borderEndEndRadius="12px"
          >
            <ModalBody
              overflow="hidden"
              backdropFilter="blur(50px)"
              width="full"
              p={'0'}
              margin="0"
              borderStartStartRadius="24px"
              borderStartEndRadius="24px"
              borderEndStartRadius="12px"
              borderEndEndRadius="12px"
              zIndex={1000}
            >
              <VStack
                p="16px"
                mx="auto"
                borderStartStartRadius="24px"
                borderStartEndRadius="24px"
                borderEndStartRadius="12px"
                borderEndEndRadius="12px"
                borderTop="2px solid"
                borderColor="cyan"
                boxShadow="0 5px 0px rgb(32,32,51), 1px 0px 0px   rgb(32,32,51), -1px 0px 0px rgb(32,32,51)"
                gap="16px"
                width="full"
              >
                <Text
                  fontSize="19px"
                  fontWeight="600"
                  fontFamily="Kanit"
                  color="gray.0"
                >
                  {stateTitle['private']}
                </Text>
                {stateComponents[enrollCardState]}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
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

          <SelectHint isOpen={showHintModal} setIsOpen={setShowHintModal} />
        </BottomModal>
      )}
    </FormProvider>
  );
};
