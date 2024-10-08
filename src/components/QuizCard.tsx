import { Card } from "@/components/Card";
import { useSelectedQuizDispatch } from "@/modules/quiz/hooks";
import { CARD_STATE, QuizCardProps } from "@/types";
import {
  // Badge,
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
import {
  forwardRef,
  LegacyRef,
  memo,
  ReactElement,
  useMemo,
  useState,
} from "react";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
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
    <HStack>
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
        <Text lineHeight="36px" fontFamily="Kanit" fontSize="5xl">
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
    { state, quiz, colored, onOpen }: QuizCardProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    const selectedQuizDispatch = useSelectedQuizDispatch();
    const [cardState] = useState(state);

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
          onClick: () => {},
          icon: (
            <TbArrowBadgeRightFilled
              size="24px"
              color="var(--chakra-colors-gray-0)"
            />
          ),
        },
        [CARD_STATE.lobby]: {
          variant: "solid",
          text: "Go to Quiz Lobby",
          onClick: () => {},
          icon: (
            <TbArrowBadgeRightFilled
              size="24px"
              color="var(--chakra-colors-gray-0)"
            />
          ),
        },
        [CARD_STATE.resource]: {
          variant: "solid",
          text: "Dive into Resources",
          onClick: () => {},
        },
        [CARD_STATE.watch]: {
          variant: "outline",
          text: "Watch as spectator",
          onClick: () => {},
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
      <VStack height="full" alignItems="stretch" ref={ref} width="full">
        <Card maxH="336px" alignItems="stretch" height="full" colored={colored}>
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
            }}
            rounded="full"
            boxSize={quiz ? "124px" : "80px"}
            position="relative"
          >
            <Img rounded="full" width="full" height="full" src={quiz?.image} />
            {/* {quiz?.isEnrolled && (
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
            )} */}
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
            date={
              new Date(quiz?.startAt).getTime() || new Date().getTime() + 10000
            }
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
          <Button
            width="100%"
            size="lg"
            variant={selectedCTA[cardState].variant}
            onClick={(e) => {
              e.stopPropagation();
              selectedCTA[cardState].onClick();
            }}
            {...("icon" in selectedCTA[cardState] && {
              rightIcon: selectedCTA[cardState].icon,
            })}
          >
            {selectedCTA[cardState].text}
          </Button>
          {quiz?.participantsCount && quiz?.userProfile && (
            <Text fontSize="xs" fontWeight="600" color="gray.100">
              {quiz?.userProfile} / {quiz?.participantsCount} people enrolled
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
