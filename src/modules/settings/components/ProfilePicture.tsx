import { colors } from "@/theme/colors";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GalleryAdd, TrashBinTrash, User } from "solar-icon-set";
import { CardSection } from "./CardSection";
import { useProfile, useProfileDispatch } from "../hooks";
import { axiosClient } from "@/configs/axios";
import { useRef, useState } from "react";
import { handleApiError } from "@/utils";

export const ProfilePicture = () => {
  const { profile } = useProfile();
  const setState = useProfileDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLarge] = useMediaQuery("(min-width: 400px)");

  const toast = useToast({
    containerStyle: { color: "black" },
  });

  const [loading, setLoading] = useState(false);

  const onRemoveImage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { wallets: _, ...rest } = profile;

    setLoading(true);

    axiosClient
      .put("/auth/info/", {
        ...rest,
        image: null,
      })
      .then(() => {
        setState(undefined);
        toast({
          description: "Profile updated successfully",
          status: "success",
        });
      })
      .catch((e) => {
        console.error("Something happened on updating user profile !", e);
        handleApiError(e, toast);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onUploadImage = (file: File) => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("username", profile.username);
    setLoading(true);

    axiosClient
      .put("/auth/info/", formData)
      .then(() => {
        setState(undefined);
      })
      .finally(() => {
        setLoading(false);
        inputRef.current.value = "";
      });
  };

  const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];

  return (
    <CardSection>
      <VStack w="full" gap="32px">
        <VStack
          fontSize="small"
          padding={0}
          boxSize="124px"
          borderRadius="full"
          background={colors.glassBackground}
          display="grid"
          placeItems="center"
        >
          {!!profile?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              fit="cover"
              borderRadius="full"
              alt={profile.username}
              src={profile?.image}
              className="w-full h-full"
              boxSize="124px"
            />
          ) : (
            <User iconStyle="Bold" size={76} />
          )}
        </VStack>
        <Input
          display="none"
          onChange={(e) => {
            if (
              !e.target ||
              !e.target.files.length ||
              !supportedFormats.includes(e.target.files[0].type)
            ) {
              toast({
                title: "Invalid Image File",
                description:
                  "Please upload an image in JPG or PNG format under 5 MB.",
                status: "error",
              });
              inputRef.current.value = "";
              return;
            }

            onUploadImage(e.target.files[0]);
          }}
          type="file"
          ref={inputRef}
        />

        <Flex
          bg="glassBackground"
          borderRadius="8px"
          p="8px"
          gap="8px"
          h="54px"
          w="full"
          alignItems="center"
        >
          <Button
            isLoading={loading}
            isDisabled={!!profile?.image}
            variant="unstyled"
            onClick={() => inputRef.current?.click()}
            flex={1}
            display="flex"
            justifyContent="center"
          >
            <HStack
              gap="6px"
              justifyContent="center"
              alignItems="center"
              wrap="wrap"
            >
              <GalleryAdd size={20} iconStyle="Linear" color="gray.20" />
              <Text
                fontSize={isLarge ? "md" : "xs"}
                fontWeight="semibold"
                color="gray.20"
                letterSpacing="0.15px"
              >
                Upload Photo
              </Text>
            </HStack>
          </Button>
          <Divider orientation="vertical" borderColor="gray.300" />
          <Button
            isDisabled={!profile?.image}
            variant="unstyled"
            onClick={onRemoveImage}
            flex={1}
            display="flex"
            justifyContent="center"
          >
            <HStack
              gap="6px"
              justifyContent="center"
              alignItems="center"
              onClick={() => {}}
            >
              <TrashBinTrash size={20} iconStyle="Linear" color="gray.20" />
              <Text
                fontSize={isLarge ? "md" : "xs"}
                fontWeight="semibold"
                color="gray.20"
                letterSpacing="0.15px"
              >
                Remove Photo
              </Text>
            </HStack>
          </Button>
        </Flex>
      </VStack>
    </CardSection>
  );
};
