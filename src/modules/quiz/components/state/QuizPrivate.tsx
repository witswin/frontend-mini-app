import { PrivateBadge } from '@/components/PrivateBadge';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckCircle, CloseCircle, KeyMinimalistic } from 'solar-icon-set';
import {
  useFormContext,
  useWatch,
  //  useWatch
} from 'react-hook-form';
import { axiosClient } from '@/configs/axios';
import { useEnrolledModalProps, useSelectedQuiz } from '../../hooks';
import { ENROLL_STATUS } from '../../types';
import { useRouter } from 'next/router';

const Form = chakra('form');
interface QuizPrivateProps extends UseDisclosureProps {
  setEnrollCardState: Dispatch<SetStateAction<ENROLL_STATUS>>;
}

export const QuizPrivate = ({ setEnrollCardState }: QuizPrivateProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    control,
  } = useFormContext<{ invitationCode: string }>();
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    status: 'error' | 'success';
  }>(undefined);
  const { invitationCode } = useWatch({ control });
  const { onOpen, onClose } = useEnrolledModalProps();

  const data = useSelectedQuiz();

  const router = useRouter();

  useEffect(() => {
    const { invitationCode } = router.query; // Access query parameters

    if (invitationCode) {
      setValue('invitationCode', invitationCode);
    }
  }, [router.query]);

  useEffect(() => {
    if (submitStatus) {
      setSubmitStatus(undefined);
    }
  }, [invitationCode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (submitStatus?.status === 'success') {
      setTimeout(() => {
        onClose();
        setEnrollCardState(ENROLL_STATUS.quizInfo);
        onOpen();
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [submitStatus]);

  return (
    <Form as={VStack} width="full" rowGap="24px">
      <PrivateBadge />
      <VStack width="full">
        <FormControl
          rowGap="6px"
          as={VStack}
          width="full"
          alignItems="flex-start"
          isInvalid={
            !!errors.invitationCode || submitStatus?.status === 'error'
          }
        >
          <FormLabel m="0" fontSize="13px" fontWeight="600" color="gray.20">
            Invitation Code
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <KeyMinimalistic iconStyle="Outline" color="gray.300" />
            </InputLeftElement>
            <Input
              autoComplete="off"
              readOnly={isSubmitting}
              placeholder="Enter code here"
              width="full"
              {...(submitStatus?.status === 'success' && {
                border: '1px solid',
                borderColor: 'green.400',
              })}
              {...register('invitationCode', {
                required: 'This field is required!',
              })}
            />
            {isSubmitting && (
              <InputRightElement>
                <Spinner size="sm" emptyColor="gray.100" thickness="2px" />
              </InputRightElement>
            )}
            {submitStatus?.status === 'success' && invitationCode && (
              <InputRightElement>
                <CheckCircle
                  color="var(--chakra-colors-green-400)"
                  iconStyle="Bold"
                />
              </InputRightElement>
            )}
            {submitStatus?.status === 'error' && invitationCode && (
              <InputRightElement>
                <CloseCircle
                  onClick={() => setValue('invitationCode', '')}
                  color="var(--chakra-colors-red-400)"
                  iconStyle="Bold"
                />
              </InputRightElement>
            )}
          </InputGroup>
          {!!errors.invitationCode && (
            <Text fontSize="13px" fontWeight="500" color="red.400">
              {errors.invitationCode.message}
            </Text>
          )}
          {!submitStatus && !errors?.invitationCode?.message && (
            <Text color="gray.60" fontSize="13px" fontWeight="500">
              Please enter your invitation code
            </Text>
          )}
          {!!submitStatus && invitationCode && (
            <Text
              fontSize="13px"
              fontWeight="500"
              color={
                submitStatus?.status === 'success' ? 'green.400' : 'red.400'
              }
            >
              {submitStatus?.message}
            </Text>
          )}
        </FormControl>
      </VStack>
      <Button
        isDisabled={isSubmitting}
        width="full"
        type="submit"
        variant="solid"
        onClick={handleSubmit(async () => {
          await axiosClient
            .get(
              `/quiz/competitions/${data?.id}/referral-code/${invitationCode}/`,
            )
            .then(() => {
              setSubmitStatus({
                status: 'success',
                message: "Success! You've unlocked access to the VIP quiz.",
              });
            })
            .catch(() => {
              setSubmitStatus({
                message: 'Invalid code. Please try again.',
                status: 'error',
              });
            });
        })}
      >
        Submit
      </Button>
    </Form>
  );
};
