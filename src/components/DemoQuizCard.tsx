import { Card } from '@/components/Card';
import { QuizCardProps } from '@/types';
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { forwardRef, LegacyRef, memo } from 'react';
import { DoubleAltArrowRight } from 'solar-icon-set';

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
const DemoQuizCard = forwardRef(
  (
    { quiz, colored, isLarge }: QuizCardProps,
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const isQuizFinished = quiz?.isFinished;

    const router = useRouter();

    const onCardClicked = () => router.push('/quiz/demo');

    return (
      <VStack ref={ref} width="full">
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
          <Button
            width="100%"
            size="lg"
            variant={'solid'}
            onClick={(e) => {
              e.stopPropagation();
              onCardClicked();
            }}
            rightIcon={
              <DoubleAltArrowRight
                iconStyle="LineDuotone"
                size={24}
                color="var(--chakra-colors-gray-0)"
              />
            }
          >
            Take a look
          </Button>
        </Card>
      </VStack>
    );
  },
);

DemoQuizCard.displayName = 'DemoQuizCard';
const MemoizedDemoQuizCard = memo(DemoQuizCard);
export { MemoizedDemoQuizCard };
