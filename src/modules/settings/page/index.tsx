import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { ProfilePicture } from '../components/ProfilePicture';
import { ProfileInfo } from '../components/ProfileInfo';
import { Connections } from '../components/Connections';
import { useEffect, useMemo, useState } from 'react';
import { axiosClient } from '@/configs/axios';
import { useProfile, useProfileDispatch } from '../hooks';
import { AxiosError } from 'axios';
import { handleApiError } from '@/utils';
import { UserProfile } from '@/types';
import { useRouter } from 'next/router';
import Wallet from '../components/Wallet';
// import { BottomModal } from "@/components/BottomModal";

export const SettingsPage = () => {
  const toast = useToast();
  const { profile } = useProfile();
  const setState = useProfileDispatch();
  const [formState, setFormState] = useState(
    (profile ?? {}) as Partial<UserProfile>,
  );
  const [loading, setLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [saveChangesModal, setSaveChangesModal] = useState(false);
  // const [pendingRoute, setPendingRoute] = useState(null);
  // const [allowNavigation, setAllowNavigation] = useState(true);

  const formData = useMemo(() => new FormData(), []);
  const router = useRouter();

  useEffect(() => {
    setFormState(profile ?? {});
    setHasChange(false);
  }, [profile]);

  // useEffect(() => {
  //   hasChange && setAllowNavigation(true);
  // }, [hasChange]);

  // useEffect(() => {
  //   const handleRouteChangeStart = (url) => {
  //     if (allowNavigation) {
  //       setSaveChangesModal(true); // Open the custom modal
  //       setPendingRoute(url); // Store the route the user wants to navigate to
  //       router.events.emit("routeChangeError");
  //       throw "routeChange aborted"; // Prevent the navigation temporarily
  //     }
  //   };

  //   // Attach the event listener
  //   router.events.on("routeChangeStart", handleRouteChangeStart);

  //   // Clean up the event listener
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //   };
  // }, [router]);

  const onSubmitChanges = () => {
    if (isError) {
      toast({
        title: '',
        description: (
          <>
            <Text>Username must be 3–20 characters</Text>
            <Text>Can include letters, numbers, and underscores.</Text>
          </>
        ),
        // 'Username must be 3–20 characters. \nCan include letters, numbers, and underscores.',
        status: 'error',
      });
    } else {
      formData.append('username', formState.username);
      setLoading(true);

      axiosClient
        .put('/auth/info/', formData)
        .then(() => {
          setState(undefined);
          setHasChange(false);
          toast({
            title: 'Changes Saved',
            description: 'Your changes have been saved successfully.',
            status: 'success',
          });
        })
        .catch((e) => {
          console.error('Something happened on updating user profile !', e);

          if (e instanceof AxiosError) {
            handleApiError(e, toast);
          } else {
            toast({
              title: 'Unable to Save Changes',
              description:
                'An error occurred while saving your changes. Please try again.',
              status: 'error',
            });
          }
        })
        .finally(() => {
          setLoading(false);
          router.push(`/profile/${profile.pk}`);
        });
    }
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
        isError={isError}
        setIsError={setIsError}
      />
      <Wallet />
      <Connections />

      {/* <BottomModal
        isOpen={saveChangesModal}
        onClose={() => setSaveChangesModal(false)}
        haveHeader={false}
      >
        <VStack w="full" gap="24px">
          <Text
            fontFamily="kanit"
            fontSize="2xl"
            fontWeight="600"
            textAlign="center"
            width="full"
            color="gray.0"
            lineHeight="28px"
            maxWidth="199px"
            mx="auto"
          >
            Unsaved Changes
          </Text>
          <Text
            textAlign="center"
            fontSize="lg"
            fontWeight="bold"
            color="gray.40"
          >
            You have unsaved changes. Do you want to save before leaving?
          </Text>
          <HStack w="full" alignItems="center" gap="16px">
            <Button
              variant="gray"
              size="md"
              flex={1}
              h="42px"
              onClick={() => {
                setSaveChangesModal(false);
                setAllowNavigation(false);
                router.push(pendingRoute); // Proceed with navigation
              }}
            >
              {"Don't Save"}
            </Button>
            <Button
              size="md"
              flex={1}
              h="42px"
              onClick={() => {
                onSubmitChanges();
                setSaveChangesModal(true);
                router.push(pendingRoute); // Proceed with navigation
              }}
            >
              {"Save Changes"}
            </Button>
          </HStack>
        </VStack>
      </BottomModal> */}

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
