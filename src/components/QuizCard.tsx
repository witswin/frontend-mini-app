import { Card } from "@/components/Card";
import { useCheckEnrolled } from "@/modules/home/hooks";
import { useSelectedQuizDispatch } from "@/modules/quiz/hooks";
import { CARD_STATE, QuizCardProps } from "@/types";
import {
  Badge,
  Box,
  Button,
  // chakra,
  HStack,
  Img,
  // Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { forwardRef, LegacyRef, memo, ReactElement, useMemo } from "react";
import { DoubleAltArrowRight } from "solar-icon-set";
// import { Swiper, SwiperSlide } from "swiper/react";

const CountDown = dynamic(
  () => import("@/components/CountDown").then((modules) => modules.CountDown),
  { ssr: false }
);
interface QuizPrizeProps {
  prize: number;
  unitPrize: string;
}
export const QuizPrize = ({ prize, unitPrize }: QuizPrizeProps) => {
  return (
    <HStack width="full">
      <Text
        fontWeight="700"
        as="span"
        display="flex"
        columnGap="2px"
        background="primaryRadial"
        backgroundClip="text"
        sx={{ WebkitTextFillColor: "transparent" }}
        alignItems="center"
      >
        <Text
          whiteSpace="break-spaces"
          wordBreak="break-all"
          lineHeight="36px"
          fontFamily="Kanit"
          fontSize="5xl"
          noOfLines={1}
          title={prize?.toFixed(2)}
        >
          {prize?.toFixed(2)}
        </Text>
        <Text fontSize="xs">{unitPrize?.toUpperCase()}</Text>
      </Text>
    </HStack>
  );
};

// const ChakraSwiper = chakra(Swiper);
const QuizCard = forwardRef(
  (
    { state, quiz, colored, onOpen, isLarge }: QuizCardProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    const selectedQuizDispatch = useSelectedQuizDispatch();
    const checkIsEnrolled = useCheckEnrolled();
    const isQuizFinished = quiz?.isFinished;

    const router = useRouter();
    const selectedCTA: {
      [key in CARD_STATE]: {
        icon?: ReactElement;
        variant: string;
        text: string;
        onClick: () => void;
      };
    } = useMemo(
      () => ({
        [CARD_STATE.join]: {
          variant: "solid",
          text: "Join Now",
          onClick: () => {
            router.push(`/quiz/${quiz.id}/match`);
          },
          icon: (
            <DoubleAltArrowRight
              iconStyle="LineDuotone"
              size={24}
              color="var(--chakra-colors-gray-0)"
            />
          ),
        },
        [CARD_STATE.lobby]: {
          variant: "solid",
          text: "Go to Quiz Lobby",
          onClick: () => {
            router.push(`/quiz/${quiz.id}/match`);
          },
          icon: (
            <DoubleAltArrowRight
              iconStyle="LineDuotone"
              size={24}
              color="var(--chakra-colors-gray-0)"
            />
          ),
        },
        [CARD_STATE.resource]: {
          variant: "solid",
          text: "Dive into Resources",
          onClick: () => {
            router.push(`/quiz/${quiz.id}/resources`);
          },
        },
        [CARD_STATE.watch]: {
          variant: "outline",
          text: quiz?.isFinished ? "Check Winners" : "Watch as spectator",
          onClick: () => {
            if (quiz?.isFinished) {
              router.push(`/quiz/${quiz.id}/result`);
            } else {
              router.push(`/quiz/${quiz.id}/match`);
            }
          },
        },
        [CARD_STATE.enroll]: {
          variant: "solid",
          text: "Enroll",
          onClick: () => {
            selectedQuizDispatch(quiz);
            onOpen();
          },
        },
      }),
      []
    );
    return (
      <VStack ref={ref} width="full">
        <Card
          sx={{
            ...(quiz?.isFinished && {
              // background: "#3E3E4F99",

              "&>div": {
                background: "#3E3E4F99",
              },
            }),
          }}
          colored={colored}
        >
          {quiz?.prizeAmount && quiz?.token && quiz?.details && (
            <VStack mb="8px" rowGap="0">
              <QuizPrize prize={quiz?.prizeAmount} unitPrize={quiz?.token} />
              <Text
                textAlign="center"
                color="gray.60"
                fontWeight="600"
                fontSize="sm"
              >
                {quiz.details}
              </Text>
            </VStack>
          )}
          <Box
            _before={{
              content: "''",
              position: "absolute",
              inset: "-1px",
              rounded: "full",
              bg: "glassBackground",
              width: isLarge ? "124px" : "80px",
              height: isLarge ? "124px" : "80px",
            }}
            rounded="full"
            boxSize={isLarge ? "124px" : "80px"}
            position="relative"
          >
            <Img
              minH={isLarge ? "124px" : "80px"}
              minW={isLarge ? "124px" : "80px"}
              rounded="full"
              boxSize={isLarge ? "124px" : "80px"}
              src={quiz?.image}
            />
            {isQuizFinished && (
              <Badge
                position="absolute"
                bottom="12px"
                left="50%"
                transform="translate(-50%,12px)"
                textTransform="capitalize"
                px="6px"
                variant="gray"
                size="md"
              >
                Expired
              </Badge>
            )}

            {checkIsEnrolled(quiz.id) && !isQuizFinished && (
              <Badge
                position="absolute"
                bottom="12px"
                left="50%"
                transform="translate(-50%,12px)"
                textTransform="capitalize"
                px="6px"
                variant="green"
                size="sm"
              >
                Enrolled
              </Badge>
            )}
          </Box>
          <VStack rowGap="4px" width="full">
            <Text
              color="gray.0"
              fontSize="2xl"
              fontWeight="600"
              fontFamily="Kanit"
              mx="auto"
              textAlign="center"
            >
              {quiz?.title}
            </Text>
            <Text fontSize="md" color="gray.60" mx="auto" textAlign="center">
              {quiz?.details}
            </Text>
          </VStack>
          <CountDown
            shows={{ day: true, hour: true, info: true, min: true, sec: true }}
            date={new Date(quiz?.startAt).getTime()}
          />
          {/* {quiz?.values && (
            <ChakraSwiper
              slidesPerView="auto"
              spaceBetween={8}
              py="2px"
              px="2px"
              width="full"
            >
              {quiz?.values.map((value) => (
                <SwiperSlide style={{ width: "fit-content" }} key={value.id}>
                  <Tag size="sm" variant="colored">
                    {value.text}
                  </Tag>
                </SwiperSlide>
              ))}
            </ChakraSwiper>
          )} */}
          {state && (
            <Button
              width="100%"
              size="lg"
              variant={selectedCTA[state].variant}
              onClick={(e) => {
                e.stopPropagation();
                selectedCTA[state].onClick();
              }}
              {...("icon" in selectedCTA[state] && {
                rightIcon: selectedCTA[state].icon,
              })}
            >
              {selectedCTA[state].text}
            </Button>
          )}
          {quiz?.participantsCount && quiz?.userProfile && (
            <Text fontSize="xs" fontWeight="600" color="gray.100">
              {quiz?.participantsCount} / {quiz?.maxParticipants} people
              enrolled
            </Text>
          )}
        </Card>
      </VStack>
    );
  }
);

QuizCard.displayName = "QuizCard";
const MemoizedQuizCard = memo(QuizCard);
export { MemoizedQuizCard as QuizCard };
