import { Card } from "@/components/Card";
import { CountDown } from "@/components/CountDown";
import { CARD_STATE, QuizCardProps } from "@/types";
import {
  Badge,
  Box,
  Button,
  chakra,
  HStack,
  Img,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  forwardRef,
  LegacyRef,
  memo,
  ReactElement,
  useMemo,
  useState,
} from "react";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";

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
          {prize.toFixed(2)}
        </Text>
        <Text fontSize="xs">{unitPrize.toUpperCase()}</Text>
      </Text>
    </HStack>
  );
};

const ChakraSwiper = chakra(Swiper);
const QuizCard = forwardRef(
  (
    { state, quizCardInfo, colored, onOpen }: QuizCardProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
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
            onOpen();
          },
        },
      }),
      []
    );
    return (
      <VStack ref={ref} width="full" maxW="320px">
        <Card colored={colored}>
          {quizCardInfo?.prize &&
            quizCardInfo?.unitPrize &&
            quizCardInfo?.prizeText && (
              <VStack mb="8px" rowGap="0">
                <QuizPrize
                  prize={quizCardInfo.prize}
                  unitPrize={quizCardInfo.unitPrize}
                />
                <Text color="gray.60" fontWeight="600" fontSize="sm">
                  {quizCardInfo.prizeText}
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
            boxSize={quizCardInfo ? "124px" : "80px"}
            position="relative"
          >
            <Img
              rounded="full"
              width="full"
              height="full"
              src="/common/default-avatar.png"
            />
            {quizCardInfo?.isEnrolled && (
              <Badge
                position="absolute"
                bottom="12px"
                left="50%"
                transform="translate(-50%,12px)"
                textTransform="capitalize"
                px="6px"
                variant="green"
                size="md"
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
              Optimism Quiz Tap
            </Text>
            <Text fontSize="md" color="gray.60" mx="auto" textAlign="center">
              Get ready for a fun ride into the future
            </Text>
          </VStack>
          <CountDown date={new Date().getTime() + 1000000} />
          {quizCardInfo?.values && (
            <ChakraSwiper
              slidesPerView="auto"
              spaceBetween={8}
              py="2px"
              px="2px"
              width="full"
            >
              {quizCardInfo?.values.map((value) => (
                <SwiperSlide style={{ width: "fit-content" }} key={value.id}>
                  <Tag size="sm" variant="colored">
                    {value.text}
                  </Tag>
                </SwiperSlide>
              ))}
            </ChakraSwiper>
          )}
          <Button
            width="100%"
            size="lg"
            variant={selectedCTA[cardState].variant}
            onClick={selectedCTA[cardState].onClick}
            {...("icon" in selectedCTA[cardState] && {
              rightIcon: selectedCTA[cardState].icon,
            })}
          >
            {selectedCTA[cardState].text}
          </Button>
          {quizCardInfo?.capacity && quizCardInfo?.enrolledNumber && (
            <Text fontSize="xs" fontWeight="600" color="gray.100">
              {quizCardInfo?.enrolledNumber} / {quizCardInfo?.capacity} people
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
