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
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { KeyMinimalistic } from 'solar-icon-set';
import {
  useForm,
  //  useWatch
} from 'react-hook-form';
import { axiosClient } from '@/configs/axios';

const Form = chakra('form');
export const QuizPrivate = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    // control,
  } = useForm<{ invitationCode: string }>({
    mode: 'onSubmit',
  });
  const [
    submitMessage,
    // setSubmitMessage
  ] = useState('');
  // const { invitationCode } = useWatch({ control });

  useEffect(() => {
    const embeddedCode = window?.Telegram?.WebApp?.initDataUnsafe?.start_param
      ?.split('code=')
      .at(-1);

    setValue('invitationCode', embeddedCode ?? '');
  }, []);

  return (
    <Form as={VStack} width="full" rowGap="24px">
      <PrivateBadge />
      <VStack width="full">
        <FormControl
          rowGap="6px"
          as={VStack}
          width="full"
          alignItems="flex-start"
          isInvalid={!!errors.invitationCode}
        >
          <FormLabel m="0" fontSize="13px" fontWeight="600" color="gray.20">
            Invitation Code
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <KeyMinimalistic iconStyle="Outline" color="gray.300" />
            </InputLeftElement>
            <Input
              readOnly={isSubmitting}
              placeholder="Enter code here"
              width="full"
              {...register('invitationCode', {
                required: 'This field is required!',
              })}
            />
            {isSubmitting && (
              <InputRightElement>
                <Spinner size="sm" emptyColor="gray.100" thickness="2px" />
              </InputRightElement>
            )}
          </InputGroup>
          {!!errors.invitationCode && (
            <Text fontSize="13px" fontWeight="500" color="red.400">
              {errors.invitationCode.message}
            </Text>
          )}
          {!submitMessage && (
            <Text color="gray.60" fontSize="13px" fontWeight="500">
              Please enter your invitation code
            </Text>
          )}
          {!!submitMessage && <Text>{submitMessage}</Text>}
        </FormControl>
      </VStack>
      <Button
        isDisabled={isSubmitting}
        width="full"
        type="submit"
        variant="solid"
        onClick={handleSubmit(async () => {
          const test = await axiosClient
            .get('/quiz/resources/')
            .then((res) => res.data);
          console.log({ test });
        })}
      >
        Submit
      </Button>
    </Form>
  );
};
