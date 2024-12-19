import { QuizPrize } from '@/components/QuizCard';
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Img,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ArticleCard } from '../../components/ArticleCard';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { axiosClient } from '@/configs/axios';
import { enrolledCompetition, quizType } from '@/globalTypes';
import { DoubleAltArrowRight, Logout3, Share } from 'solar-icon-set';
import { useCheckEnrolled } from '@/modules/home/hooks';
import {
  useEnrolledModalProps,
  useGetCardState,
  useSelectedQuizDispatch,
} from '../../hooks';
import { CARD_STATE } from '@/types';
import { useAuth } from '@/hooks/useAuthorization';
import { EnrolledCard } from '../../components/EnrolledCard';
import { AxiosError, AxiosResponse } from 'axios';
import { ParticipantsCount } from '@/components/ParticipantsCount';
import { Loading } from '@/components/Loading';

const ShareModal = dynamic(
  () => import('./ShareModal').then((modules) => modules.ShareModal),
  {
    ssr: false,
  },
);
const CountDown = dynamic(
  () => import('@/components/CountDown').then((modules) => modules.CountDown),
  { ssr: false },
);
export const QuizInfo = () => {
  const { query } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ['quiz', query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });
  const router = useRouter();

  const checkIsEnrolledQuiz = useCheckEnrolled();
  const isEnrolled = checkIsEnrolledQuiz(data?.id);
  const cardState = useGetCardState(data);

  const queryClient = useQueryClient();

  const authInfo = useAuth();

  const { data: enrolledCompetitions, isLoading } = useQuery({
    queryKey: ['enrolledCompetition', authInfo?.token, query?.id],
    queryFn: async () =>
      await axiosClient
        .get<string, AxiosResponse<enrolledCompetition[]>>(
          `/quiz/competitions/enroll?competition_pk=${query?.id}`,
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          },
        )
        .then((res) => res.data),
    enabled: !!authInfo?.token,
  });

  const toast = useToast({
    position: 'top',
  });

  const selectedQuizDispatch = useSelectedQuizDispatch();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axiosClient.delete(
        `/quiz/competitions/enroll/${enrolledCompetitions[0].id}/`,
        {
          headers: {
            Authorization: `TOKEN ${authInfo?.token}`,
          },
        },
      );
    },
    onError: (data: AxiosError<[string]>) => {
      toast({
        description: data.response.data?.[0],
        status: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrolledCompetition'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', query?.id] });
      toast({
        description: `You have cancelled ${data?.title}`,
        status: 'success',
      });
    },
  });

  const { onOpen } = useEnrolledModalProps();

  useEffect(() => {
    selectedQuizDispatch(data);
  }, [data]);
  const isClosed = data?.participantsCount === data?.maxParticipants;


  const CTAButton = useMemo(
    () => ({
      [CARD_STATE.join]: isEnrolled ? (
        <Button
          onClick={() => {
            router.push(`/quiz/${data.id}/match`);
          }}
          rightIcon={
            <DoubleAltArrowRight
              color="var(--chakra-colors-gray-0)"
              iconStyle="LineDuotone"
            />
          }
          width="full"
          size="lg"
          variant="solid"
        >
          Join Now
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push(`/quiz/${data.id}/match`);
          }}
          width="full"
          size="lg"
          variant="solid"
        >
          Join Now
        </Button>
      ),
      [CARD_STATE.lobby]: (
        <Button
          onClick={() => {
            router.push(`/quiz/${data.id}/match`);
          }}
          rightIcon={
            <DoubleAltArrowRight
              color="var(--chakra-colors-gray-0)"
              iconStyle="LineDuotone"
            />
          }
          width="full"
          size="lg"
          variant="solid"
        >
          Join Now
        </Button>
      ),
      [CARD_STATE.resource]: <></>,
      [CARD_STATE.watch]: (
        <Button
          onClick={() => {
            if (data?.isFinished) {
              router.push(`/quiz/${data.id}/result`);
            } else {
              router.push(`/quiz/${data.id}/match`);
            }
          }}
          width="full"
          size="lg"
          variant="outline"
        >
          {data?.isFinished ? 'Check Winners' : 'Watch as spectator'}
        </Button>
      ),
      [CARD_STATE.enroll]: (
        <Button
          onClick={() => {
            // if (!authInfo?.token) {
            //   connect();
            // } else {
            //   onOpen();
            // }
            onOpen();
          }}
          width="full"
          size="lg"
          variant="solid"
          isDisabled={isClosed && !!data?.maxParticipants}
        >
          {isClosed && !!data?.maxParticipants
            ? 'Enrollment Closed'
            : 'Enroll Quiz'}
        </Button>
      ),
    }),
    [
      data?.id,
      data?.isFinished,
      data?.maxParticipants,
      isClosed,
      isEnrolled,
      onOpen,
      router,
    ],
  );
  const { isOpen, onOpen: shareModalOnOpen, onClose } = useDisclosure();

  return (
    <>
      {isLoading ? (
        <Center alignItems="center" justifyContent="center" height="90vh">
          <Loading />
        </Center>
      ) : (
        <>
          <VStack
            overflow="hidden"
            position="relative"
            rowGap="16px"
            width="full"
          >
            {/* isPrivate &&  <PrivateBadge /> */}
            <VStack
              bg="glassBackground"
              borderRadius="16px"
              p="16px"
              rowGap="16px"
              width="full"
            >
              <HStack justifyContent="space-between" width="full">
                <Box position="relative">
                  <Img
                    style={{ borderRadius: '50%' }}
                    src={data?.image}
                    alt={data?.title}
                    width="80px"
                    height="80px"
                  />
                  {isEnrolled && (
                    <Badge
                      left="50%"
                      transform="translateX(-50%)"
                      variant="green"
                      position="absolute"
                      bottom="0"
                      size="sm"
                      textTransform="capitalize"
                    >
                      Enrolled
                    </Badge>
                  )}
                </Box>
                <VStack alignItems="flex-end" rowGap="0">
                  <QuizPrize
                    prize={data?.formattedPrize ? data?.formattedPrize : 0}
                    unitPrize={data?.token}
                  />
                  <Text
                    fontSize="sm"
                    lineHeight="20px"
                    fontWeight="600"
                    color="gray.60"
                  >
                    Yours to Win!
                  </Text>
                </VStack>
              </HStack>
              <VStack width="full" alignItems="flex-start" rowGap="4px">
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  width="full"
                >
                  <Text
                    color="gray.0"
                    fontSize="2xl"
                    fontWeight="600"
                    fontFamily="kanit"
                    lineHeight="28px"
                  >
                    {data?.title}
                  </Text>
                  <Center
                    onClick={() => {
                      shareModalOnOpen();
                    }}
                  >
                    <Share iconStyle="Outline" size={24} />
                  </Center>
                </HStack>
                <Text fontSize="md" lineHeight="22px" color="gray.60">
                  {data?.details}
                </Text>
                {data?.maxParticipants ? (
                  <ParticipantsCount quiz={data} />
                ) : (
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    lineHeight="16px"
                    color="gray.100"
                  >
                    {data?.participantsCount}
                    {data?.maxParticipants !== 0 &&
                      '/ ' + data?.maxParticipants}
                  </Text>
                )}
              </VStack>
              {data?.startAt && (
                <CountDown
                  shows={{
                    day: true,
                    hour: true,
                    info: true,
                    min: true,
                    sec: true,
                  }}
                  date={new Date(data?.startAt).getTime()}
                />
              )}

              {isEnrolled && (
                <Box width="full" position="relative" zIndex={0}>
                  <Button
                    onClick={() => mutate()}
                    variant="gray"
                    width="full"
                    leftIcon={
                      <Logout3
                        size={20}
                        iconStyle="LineDuotone"
                        color="var(--chakra-colors-gray-0)"
                      />
                    }
                  >
                    Cancel Enrollment
                  </Button>
                </Box>
              )}
            </VStack>
            {data?.resources
              ?.filter((article) => article.isActive)
              .map((article) => (
                <ArticleCard
                  key={article.id}
                  articleTitle={article.title}
                  banner={article.image}
                  content={article.content}
                  link={article.link}
                  linkText={article.linkText}
                />
              ))}
          </VStack>

          <Box
            py="10px"
            bg="blackGradient"
            zIndex={2}
            position="fixed"
            bottom="0px"
            left="50%"
            transform="translateX(-50%)"
            width="full"
            maxW="538px"
            px="16px"
          >
            {CTAButton[cardState]}
          </Box>

          <EnrolledCard />
          <ShareModal onClose={onClose} isOpen={isOpen} />
        </>
      )}
    </>
  );
};
