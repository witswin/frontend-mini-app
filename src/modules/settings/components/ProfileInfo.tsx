import { Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import { CardSection } from "./CardSection"
import { colors } from "@/theme/colors"
import { useProfile, useProfileDispatch } from "../hooks"
import { useEffect, useState } from "react"
import { UserProfile } from "@/types"
import { axiosClient } from "@/configs/axios"
import { AxiosError } from "axios"
import { handleApiError } from "@/utils"

export const ProfileInfo = () => {
  const { profile } = useProfile()

  const [formState, setFormState] = useState(
    (profile ?? {}) as Partial<UserProfile>
  )
  const setState = useProfileDispatch()
  const [hasChange, setHasChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setFormState(profile ?? {})
    setHasChange(false)
  }, [profile])

  const onFormItemChange = (value: string, name: string) => {
    setFormState({ ...formState, [name]: value })
    setHasChange(true)
  }

  const onSubmitChanges = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append("username", formState.username)
    formData.append("firstName", formState.firstName)
    formData.append("lastName", formState.lastName)

    axiosClient
      .put("/auth/info/", formData)
      .then(() => {
        setState(undefined)
        setHasChange(false)
        toast({
          description: "Profile updated successfully",
          status: "success",
        })
      })
      .catch((e) => {
        console.error("Something happened on updating user profile !", e)

        if (e instanceof AxiosError) {
          handleApiError(e, toast)
        } else {
          toast({
            description: "Something went wrong!",
            status: "error",
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CardSection mt="3">
      <Text fontWeight="bold" color="gray.10" fontSize="xl">
        Account Info
      </Text>
      <FormLabel width="full">
        Username
        <Input
          name="username"
          mt="1"
          value={formState.username}
          onChange={(e) => onFormItemChange(e.target.value, "username")}
          background={colors.inputBackground}
          placeholder="People will know you by this name."
        />
      </FormLabel>
      {/* <FormLabel width="full">
        First Name
        <Input
          name="firstName"
          mt="1"
          value={formState.firstName ?? ""}
          onChange={(e) => onFormItemChange(e.target.value, "firstName")}
          background={colors.inputBackground}
          placeholder=""
        />
      </FormLabel>
      <FormLabel width="full">
        Last Name
        <Input
          name="lastName"
          value={formState.lastName ?? ""}
          onChange={(e) => onFormItemChange(e.target.value, "lastName")}
          mt="1"
          background={colors.inputBackground}
          placeholder=""
        />
      </FormLabel> */}

      <Button
        onClick={() => onSubmitChanges()}
        isLoading={loading}
        disabled={!hasChange}
        mt="4"
        width="full"
      >
        Save Changes
      </Button>
    </CardSection>
  )
}
