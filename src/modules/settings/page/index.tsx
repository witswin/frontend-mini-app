import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import { ProfilePicture } from "../components/ProfilePicture";
import { ProfileInfo } from "../components/ProfileInfo";
import { Connections } from "../components/Connections";
import { useEffect, useMemo, useState } from "react";
import { axiosClient } from "@/configs/axios";
import { useProfile, useProfileDispatch } from "../hooks";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils";
import { UserProfile } from "@/types";

export const SettingsPage = () => {
  const toast = useToast();
  const { profile } = useProfile();
  const setState = useProfileDispatch();
  const [formState, setFormState] = useState(
    (profile ?? {}) as Partial<UserProfile>
  );
  const [loading, setLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  // const [isError, setIsError] = useState(false);

  const formData = useMemo(() => new FormData(), []);

  useEffect(() => {
    setFormState(profile ?? {});
    setHasChange(false);
  }, [profile]);

  const onSubmitChanges = () => {
    console.log("after submit");

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    formData.append("username", formState.username);
    setLoading(true);

    axiosClient
      .put("/auth/info/", formData)
      .then(() => {
        setState(undefined);
        setHasChange(false);
        toast({
          title: "Changes Saved",
          description: "Your changes have been saved successfully.",
          status: "success",
        });
      })
      .catch((e) => {
        console.error("Something happened on updating user profile !", e);

        if (e instanceof AxiosError) {
          handleApiError(e, toast);
        } else {
          toast({
            title: "Unable to Save Changes",
            description:
              "An error occurred while saving your changes. Please try again.",
            status: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <VStack gap="16px" pb="60px" position="relative">
      <VStack width="full" mb="8px" gap="4px">
        <Text
          fontFamily="Kanit"
          fontWeight="bold"
          color="gray.0"
          mt="5"
          fontSize="5xl"
        >
          Account Settings
        </Text>
        <Text
          fontWeight="semibold"
          color="gray.60"
          fontSize="md"
          textAlign="center"
          mx="auto"
        >
          Your profile information and social links are visible to other users.
        </Text>
      </VStack>

      <ProfilePicture formData={formData} setHasChange={setHasChange} />

      <ProfileInfo
        formState={formState}
        setHasChange={setHasChange}
        setFormState={setFormState}
        // isError={isError}
        // setIsError={setIsError}
      />
      <Connections />

      {hasChange && (
        <VStack
          position="fixed"
          bottom={0}
          w="full"
          maxW="500px"
          h="58px"
          sx={{ opacity: 1, zIndex: 999 }}
        >
          <Button
            onClick={() => onSubmitChanges()}
            isLoading={loading}
            isDisabled={!hasChange}
            w="full"
            bottom="0"
            height="50px"
          >
            Save Changes
          </Button>
        </VStack>
      )}
    </VStack>
  );
};
