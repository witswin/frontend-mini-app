import { colors } from "@/theme/colors"
import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { GalleryAdd, TrashBinTrash, User } from "solar-icon-set"
import { CardSection } from "./CardSection"
import { useProfile, useProfileDispatch } from "../hooks"
import { axiosClient } from "@/configs/axios"
import { useRef, useState } from "react"

export const ProfilePicture = () => {
  const { profile } = useProfile()
  const setState = useProfileDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const [loading, setLoading] = useState(false)

  const onRemoveImage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { wallets: _, ...rest } = profile

    setLoading(true)

    axiosClient
      .put("/auth/info/", {
        ...rest,
        image: null,
      })
      .then(() => {
        setState(undefined)
        toast({
          description: "Profile updated successfully",
          status: "success",
        })
      })
      .catch((e) => {
        console.error("Something happened on updating user profile !", e)
        toast({
          description: "Something went wrong!",
          status: "error",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onUploadImage = (file: File) => {
    const formData = new FormData()

    formData.append("image", file)
    formData.append("username", profile.username)
    formData.append("firstName", profile.firstName)
    formData.append("lastName", profile.lastName)
    setLoading(true)

    axiosClient
      .put("/auth/info/", formData)
      .then(() => {
        setState(undefined)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CardSection>
      <Box
        fontSize="small"
        padding={0}
        width={128}
        height={128}
        borderRadius="full"
        background={colors.glassBackground}
        display="grid"
        placeItems="center"
      >
        {profile?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            objectFit="cover"
            borderRadius="full"
            alt={profile.username}
            src={profile.image}
            className="w-full h-full"
          />
        ) : (
          <User iconStyle="Bold" size={76} />
        )}
        <Input
          display="none"
          onChange={(e) => {
            if (!e.target || !e.target.files.length) return

            onUploadImage(e.target.files[0])
          }}
          type="file"
          ref={inputRef}
        />
      </Box>

      <Box
        mt="4"
        gap={2}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        background={colors.glassBackground}
        padding="2"
        borderRadius="8px"
        width="full"
        pointerEvents={loading ? "none" : "auto"}
        opacity={loading ? 0.6 : 1}
      >
        <Button
          variant="unstyled"
          display="flex"
          alignItems="center"
          gap={1}
          textColor={colors.gray[20]}
          onClick={() => inputRef.current?.click()}
        >
          <GalleryAdd size={25} />
          <Text>Upload Photo</Text>
        </Button>
        <Divider orientation="vertical" height="20px" />
        <Button
          variant="unstyled"
          display="flex"
          alignItems="center"
          gap={3}
          textColor={colors.gray[20]}
          onClick={onRemoveImage}
        >
          <TrashBinTrash size={25} />
          <Text>Remove Photo</Text>
        </Button>
      </Box>
    </CardSection>
  )
}
