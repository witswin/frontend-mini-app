import { QuizPrize } from "@/components/QuizCard";
import {
  Badge,
  Box,
  Button,
  chakra,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArticleCard } from "../../components/ArticleCard";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { QUIZ_STATE } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { axiosClient } from "@/configs/axios";
import { quizType } from "@/globalTypes";
import { DoubleAltArrowRight, Logout3 } from "solar-icon-set";

const CountDown = dynamic(
  () => import("@/components/CountDown").then((modules) => modules.CountDown),
  { ssr: false }
);
const ChakraSwiper = chakra(Swiper);
export const QuizInfo = () => {
  const isEnrolled = true;
  const heart = 3;

  const { query } = useRouter();
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  });

  const CTAButton = useMemo(
    () => ({
      [QUIZ_STATE.default]: isEnrolled ? null : (
        <Button width="full" size="lg" variant="solid">
          Enroll Quiz
        </Button>
      ),
      [QUIZ_STATE.lobby]: isEnrolled ? (
        <Button
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
          Go to Quiz Lobby
        </Button>
      ) : (
        <Button width="full" size="lg" variant="outline">
          Watch as spectator
        </Button>
      ),
      [QUIZ_STATE.started]: isEnrolled ? (
        <Button
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
        <Button width="full" size="lg" variant="outline">
          Watch as spectator
        </Button>
      ),
      [QUIZ_STATE.penalty]:
        heart > 0 && isEnrolled ? (
          <Button
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
          <Button width="full" size="lg" variant="outline">
            Watch as spectator
          </Button>
        ),
    }),
    []
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
              <Image
                style={{ borderRadius: "50%" }}
                src={data?.image}
                alt={data?.title}
                width={80}
                height={80}
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
              <QuizPrize prize={data?.prizeAmount} unitPrize={data?.token} />
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
              {data?.participantsCount} / 1,400 people enrolled
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
              {[
                "Aura Authentication",
                "Unitap Pass Owner",
                "sadfkhasoidhasoiudg",
                "dhasuuid uw",
                "asjdhasu",
              ].map((value) => (
                <SwiperSlide style={{ width: "fit-content" }} key={value}>
                  <Tag size="sm" variant="gray">
                    {value}
                  </Tag>
                </SwiperSlide>
              ))}
            </ChakraSwiper>
          )}
        </VStack>
        <ArticleCard
          articleTitle="salam"
          content={`asdjkhasjdhas dasidh ioasdh ioasdh ioasdhioashdioashdioashdioash
          dioashd asdhas sa dioashd asiodh ioasdh aiosdh asidhioasdh
          asidhiasofhcjxzcvb`}
          banner=""
          link="www.google.com"
          linkText="google"
        />
      </VStack>

      <Box
        px="16px"
        py="10px"
        bg="blackGradient"
        zIndex={2}
        position="sticky"
        bottom="0px"
        left="0"
        width="full"
        maxW="538px"
      >
        {CTAButton["lobby"]}
      </Box>
    </>
  );
};
