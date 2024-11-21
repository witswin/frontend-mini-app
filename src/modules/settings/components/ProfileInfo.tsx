import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CardSection } from "./CardSection";
import { useProfile } from "../hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserProfile } from "@/types";

export const ProfileInfo = ({
  formState,
  setFormState,
  setHasChange,
}: {
  formState: Partial<UserProfile>;
  setFormState: Dispatch<SetStateAction<Partial<UserProfile>>>;
  setHasChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { profile } = useProfile();

  useEffect(() => {
    setFormState(profile ?? {});
    setHasChange(false);
    setValid(!usernameRegex.test(formState.username));
  }, [profile]);

  const onFormItemChange = (value: string, name: string) => {
    setFormState({ ...formState, [name]: value });
    setHasChange(true);
  };

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const [valid, setValid] = useState(false);
  // const isError = formState.username === "";
  // const isError = hasChange && !usernameRegex.test(formState.username);

  return (
    <CardSection>
      <Text fontWeight="bold" color="gray.10" fontSize="xl">
        Account Info
      </Text>

      <FormControl width="full" isInvalid={valid}>
        <FormLabel color="gray.20" fontWeight="semibold" fontSize="sm">
          Username
        </FormLabel>
        <Input
          name="username"
          value={formState.username}
          onChange={(e) => onFormItemChange(e.target.value, "username")}
          background="inputBackground"
          placeholder="username"
          height="46px"
          borderRadius="8px"
          border="solid 1px"
          borderColor="gray.400"
          focusBorderColor="blue"
          _focus={{
            boxShadow: "0 0 12px rgba(110, 129, 238, 0.24)",
          }}
          _invalid={{
            boxShadow: "unset",
            borderColor: "red.400",
          }}
        />
        {valid ? (
          <FormErrorMessage
            color="red.400"
            fontSize="sm"
            fontWeight="medium"
            as={VStack}
            alignItems="start"
            gap="2px"
          >
            <Text color="red.400">{"Username must be 3–20 characters."}</Text>
            <Text>{"Can include letters, numbers, and underscores."}</Text>
          </FormErrorMessage>
        ) : (
          <FormHelperText color="gray.60" fontSize="sm" fontWeight="medium">
            people will know you by this name.
          </FormHelperText>
        )}
      </FormControl>
    </CardSection>
  );
};
