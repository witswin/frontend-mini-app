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
import { GalleryAdd, TrashBinTrash } from "solar-icon-set";
import { CardSection } from "./CardSection";
import { useProfile } from "../hooks";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const ProfilePicture = ({
  formData,
  setHasChange,
}: {
  formData: FormData;
  setHasChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { profile } = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLarge] = useMediaQuery("(min-width: 400px)");

  const toast = useToast({
    containerStyle: { color: "black" },
  });

  const [localImage, setLocalImage] = useState(null);
  const [profImage, setProfImage] = useState(null);

  useEffect(() => {
    setProfImage(profile?.image);
  }, [profile]);

  const onRemoveImage = () => {
    setLocalImage("");
    setProfImage("");
    inputRef.current.value = "";
    setHasChange(true);

    console.log(formData.get("image"));

    if (!!formData.get("image")) {
      formData.delete("image");
    }
    formData.append("image", "");

    formData.forEach((value, key) => {
      console.log(key, value);
    });
  };

  const onUploadImage = (file: File) => {
    setLocalImage(file);
    formData.append("image", file);
    setHasChange(true);
  };

  const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];

  return (
    <CardSection>
      <VStack w="full" gap="32px">
        <VStack
          boxSize="124px"
          borderRadius="full"
          background={colors.glassBackground}
        >
          <Image
            fit="cover"
            borderRadius="full"
            alt={profile?.username}
            src={
              !!localImage
                ? URL.createObjectURL(localImage)
                : !!profImage
                ? profImage
                : "/assets/images/profile/Avatar.svg"
            }
            className="w-full h-full"
            boxSize="124px"
          />
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
            isDisabled={!!profImage || !!localImage}
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
            isDisabled={!profImage && !localImage}
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
