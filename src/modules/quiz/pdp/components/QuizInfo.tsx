import { QuizPrize } from "@/components/QuizCard";
import {
  Badge,
  Box,
  Button,
  chakra,
  HStack,
  Img,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArticleCard } from "../../components/ArticleCard";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { axiosClient } from "@/configs/axios";
import { enrolledCompetition, quizType } from "@/globalTypes";
import { DoubleAltArrowRight, Logout3 } from "solar-icon-set";
import { useCheckEnrolled } from "@/modules/home/hooks";
import {
  useEnrolledModalProps,
  useGetCardState,
  useSelectedQuizDispatch,
} from "../../hooks";
import { CARD_STATE } from "@/types";
import { useAuth } from "@/hooks/useAuthorization";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { EnrolledCard } from "../../components/EnrolledCard";
import { AxiosError, AxiosResponse } from "axios";

const CountDown = dynamic(
  () => import("@/components/CountDown").then((modules) => modules.CountDown),
  { ssr: false }
);
const ChakraSwiper = chakra(Swiper);
export const QuizInfo = () => {
  const { query } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });
  const router = useRouter();

  const checkIsEnrolledQuiz = useCheckEnrolled();
  const isEnrolled = checkIsEnrolledQuiz(data?.id);
  const cardState = useGetCardState(data);

  const { connect } = useWalletConnection();

  const queryClient = useQueryClient();

  const authInfo = useAuth();

  const { data: enrolledCompetitions } = useQuery({
    queryKey: ["enrolledCompetition", authInfo?.token, query?.id],
    queryFn: async () =>
      await axiosClient
        .get<string, AxiosResponse<enrolledCompetition[]>>(
          `/quiz/competitions/enroll?competition_pk=${query?.id}`,
          {
            headers: {
              Authorization: `TOKEN ${authInfo?.token}`,
            },
          }
        )
        .then((res) => res.data),
    enabled: !!authInfo?.token,
  });

  const toast = useToast({
    position: "bottom",
  });

  const selectedQuizDispatch = useSelectedQuizDispatch();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axiosClient
        .delete(`/quiz/competitions/enroll/${enrolledCompetitions[0].id}/`, {
          headers: {
            Authorization: `TOKEN ${authInfo?.token}`,
          },
        })
        .then((res) => console.log(res.data));
    },
    onError: (data: AxiosError<{ detail: string }>) => {
      toast({
        description: data.response.data.detail,
        status: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCompetition"] });
      toast({
        description: `You have enrolled ${data?.title}`,
        status: "success",
      });
    },
  });

  const { onOpen } = useEnrolledModalProps();

  useEffect(() => {
    selectedQuizDispatch(data);
  }, []);

  const CTAButton = useMemo(
    () => ({
      [CARD_STATE.join]: isEnrolled ? null : (
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
          {data?.isFinished ? "Check Winners" : "Watch as spectator"}
        </Button>
      ),
      [CARD_STATE.enroll]: (
        <Button
          onClick={() => {
            if (!authInfo?.token) {
              connect();
            } else {
              onOpen();
            }
          }}
          width="full"
          size="lg"
          variant="solid"
        >
          Enroll Quiz
        </Button>
      ),
    }),
    [authInfo]
  );

  return (
    <>
      <VStack position="relative" rowGap="16px" width="full">
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
                style={{ borderRadius: "50%" }}
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
                prize={data?.prizeAmount ? data?.prizeAmount / 1e18 : 0}
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
            <Text
              color="gray.0"
              fontSize="2xl"
              fontWeight="600"
              fontFamily="kanit"
              lineHeight="28px"
            >
              {data?.title}
            </Text>
            <Text fontSize="md" lineHeight="22px" color="gray.60">
              {data?.details}
            </Text>
            <Text
              fontSize="xs"
              fontWeight="600"
              lineHeight="16px"
              color="gray.100"
            >
              {data?.participantsCount} / {data?.maxParticipants}
            </Text>
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

          {isEnrolled ? (
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
          ) : (
            <ChakraSwiper
              slidesPerView="auto"
              spaceBetween={8}
              py="2px"
              px="2px"
              width="full"
            >
              {["Aura Authentication", "Unitap Pass Owner"].map((value) => (
                <SwiperSlide style={{ width: "fit-content" }} key={value}>
                  <Tag size="sm" variant="gray">
                    {value}
                  </Tag>
                </SwiperSlide>
              ))}
            </ChakraSwiper>
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
    </>
  );
};
