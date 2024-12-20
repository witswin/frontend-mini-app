import { Card } from '@/components/Card';
import { useCheckEnrolled } from '@/modules/home/hooks';
import { useSelectedQuizDispatch } from '@/modules/quiz/hooks';
import { CARD_STATE, QuizCardProps } from '@/types';
import {
  Badge,
  Box,
  Button,
  Center,
  // chakra,
  HStack,
  Img,
  // Tag,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { forwardRef, LegacyRef, memo, ReactElement, useMemo } from 'react';
import { DoubleAltArrowRight, Share } from 'solar-icon-set';
import { PrivateBadge } from './PrivateBadge';
import { ParticipantsCount } from './ParticipantsCount';
// import { Swiper, SwiperSlide } from "swiper/react";

const ShareModal = dynamic(
  () =>
    import('@/modules/quiz/pdp/components/ShareModal').then(
      (modules) => modules.ShareModal,
    ),
  { ssr: false },
);

const CountDown = dynamic(
  () => import('@/components/CountDown').then((modules) => modules.CountDown),
  { ssr: false },
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
        sx={{ WebkitTextFillColor: 'transparent' }}
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
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const selectedQuizDispatch = useSelectedQuizDispatch();
    const checkIsEnrolled = useCheckEnrolled();
    const isQuizFinished = quiz?.isFinished;
    const isPrivate = quiz?.isVip;

    const {
      isOpen: shareModalIsOpen,
      onClose: shareModalOnclose,
      onOpen: shareModalOnOpen,
    } = useDisclosure();

    const isClosed = quiz?.participantsCount === quiz.maxParticipants;

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
          variant: 'solid',
          text: 'Join Now',
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
          variant: 'solid',
          text: 'Go to Quiz Lobby',
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
          variant: 'solid',
          text: 'Dive into Resources',
          onClick: () => {
            router.push(`/quiz/${quiz.id}/resources`);
          },
        },
        [CARD_STATE.watch]: {
          variant: 'outline',
          text: quiz?.isFinished ? 'Check Winners' : 'Watch as spectator',
          onClick: () => {
            if (quiz?.isFinished) {
              router.push(`/quiz/${quiz.id}/result`);
            } else {
              router.push(`/quiz/${quiz.id}/match`);
            }
          },
        },
        [CARD_STATE.enroll]: {
          variant: 'solid',
          text:
            isClosed && !!quiz?.maxParticipants
              ? 'Enrollment Closed'
              : 'Enroll',
          onClick: () => {
            selectedQuizDispatch(quiz);
            onOpen();
          },
        },
      }),
      [isClosed, onOpen, quiz, router, selectedQuizDispatch],
    );
    return (
      <VStack height="full" width="full" justifyContent="center">
        <VStack
          position="relative"
          ref={ref}
          overflow="hidden"
          p="2px"
          width="full"
        >
          <Center
            cursor="pointer"
            position="absolute"
            top="16px"
            right="16px"
            zIndex={3}
            onClick={(e) => {
              e.stopPropagation();
              shareModalOnOpen();
            }}
          >
            <Share iconStyle="Outline" size={24} />
          </Center>
          {isPrivate && <PrivateBadge />}
          <Card
            sx={{
              ...(quiz?.isFinished && {
                // background: "#3E3E4F99",

                '&>div': {
                  background: '#3E3E4F99',
                },
              }),
            }}
            colored={colored}
          >
            {quiz?.formattedPrize && quiz?.token && quiz?.details && (
              <VStack mb="8px" rowGap="0">
                <Center>
                  <QuizPrize
                    prize={quiz?.formattedPrize}
                    unitPrize={quiz?.token}
                  />
                </Center>
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
                position: 'absolute',
                inset: '-1px',
                rounded: 'full',
                bg: 'glassBackground',
                width: isLarge ? '124px' : '80px',
                height: isLarge ? '124px' : '80px',
              }}
              rounded="full"
              boxSize={isLarge ? '124px' : '80px'}
              position="relative"
            >
              <Img
                minH={isLarge ? '124px' : '80px'}
                minW={isLarge ? '124px' : '80px'}
                rounded="full"
                boxSize={isLarge ? '124px' : '80px'}
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
              shows={{
                day: true,
                hour: true,
                info: true,
                min: true,
                sec: true,
              }}
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
                isDisabled={
                  isClosed &&
                  state === CARD_STATE.enroll &&
                  !!quiz?.maxParticipants
                }
                width="100%"
                size="lg"
                variant={selectedCTA[state].variant}
                onClick={(e) => {
                  e.stopPropagation();
                  selectedCTA[state].onClick();
                }}
                {...('icon' in selectedCTA[state] && {
                  rightIcon: selectedCTA[state].icon,
                })}
              >
                {selectedCTA[state].text}
              </Button>
            )}
            {quiz?.maxParticipants ? (
              <ParticipantsCount quiz={quiz} />
            ) : (
              quiz?.participantsCount &&
              quiz?.userProfile && (
                <Text fontSize="xs" fontWeight="600" color="gray.100">
                  {quiz?.participantsCount}
                  {quiz?.maxParticipants !== 0 &&
                    '/ ' + quiz?.maxParticipants}{' '}
                  people enrolled
                </Text>
              )
            )}
          </Card>
        </VStack>
        <ShareModal
          quiz={quiz}
          isOpen={shareModalIsOpen}
          onClose={shareModalOnclose}
        />
      </VStack>
    );
  },
);

QuizCard.displayName = 'QuizCard';
const MemoizedQuizCard = memo(QuizCard);
export { MemoizedQuizCard as QuizCard };
