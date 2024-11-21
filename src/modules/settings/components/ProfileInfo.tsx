import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { CardSection } from "./CardSection";
import { useProfile } from "../hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  }, [profile]);

  const onFormItemChange = (value: string, name: string) => {
    setFormState({ ...formState, [name]: value });
    setHasChange(true);
  };

  return (
    <CardSection>
      <Text fontWeight="bold" color="gray.10" fontSize="xl">
        Account Info
      </Text>

      <FormControl width="full">
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
        />

        <FormHelperText color="gray.60" fontSize="sm" fontWeight="medium">
          people will know you by this name.
        </FormHelperText>
      </FormControl>
    </CardSection>
  );
};
