import { BoxProps, HStack, Text, VStack } from '@chakra-ui/react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CalendarMark } from 'solar-icon-set';

interface TimerBoxProps extends BoxProps {
  topText: number | string;
  topIcon?: ReactNode;
  bottomText: string;
  bottomIcon?: ReactNode;
  isComplete?: boolean;
  isDisabled?: boolean;
}
const TimerBox = ({
  topText,
  topIcon,
  bottomText,
  bottomIcon,
  isComplete,
  isDisabled,
  ...boxProps
}: TimerBoxProps) => {
  return (
    <VStack
      minW="38px"
      minH="58px"
      alignItems="flex-start"
      borderRadius="8px"
      justifyContent="space-between"
      {...boxProps}
    >
      <HStack columnGap="4px" width="full">
        {topIcon}
        <Text
          fontWeight="600"
          lineHeight="20px"
          textAlign="center"
          fontSize="13px"
          color={topIcon ? 'gray.40' : 'gray.20'}
          {...(!topIcon && {
            width: 'full',
            mx: 'auto',
          })}
          {...(isComplete && {
            bg: 'redRadial',
            sx: {
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          })}
          {...(isDisabled && {
            color: 'gray.400',
          })}
        >
          {topText}
        </Text>
      </HStack>
      <HStack columnGap="4px" width="full">
        {bottomIcon}
        <Text
          fontWeight="600"
          fontSize={bottomIcon ? '13px' : '10px'}
          color={bottomIcon ? 'gray.40' : 'gray.60'}
          lineHeight="16px"
          {...(!bottomIcon && {
            width: 'full',
            mx: 'auto',
            textAlign: 'center',
          })}
        >
          {bottomText}
        </Text>
      </HStack>
    </VStack>
  );
};

interface CountDownProps {
  date: Date | number;
  dateTimeStyle?: BoxProps;
  timerStyle?: BoxProps;
  containerStyle?: BoxProps;
  shows: {
    info?: boolean;
    day?: boolean;
    hour?: boolean;
    min?: boolean;
    sec?: boolean;
  };
}
export const CountDown = ({
  date,
  dateTimeStyle,
  timerStyle,
  shows,
  containerStyle,
}: CountDownProps) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleDateString('default', {
      month: 'short',
      day: '2-digit',
    });

    const formattedTime = dateObject.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });

    return (
      <HStack justifyContent="flex-start" width="full" columnGap="12px">
        {shows.info && (
          <TimerBox
            topIcon={
              <CalendarMark
                size={16}
                iconStyle="Bold"
                color="var(--chakra-colors-gray-40)"
              />
            }
            topText={formattedDate}
            bottomText={formattedTime}
            bottomIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.99967 14.6673C11.6816 14.6673 14.6663 11.6826 14.6663 8.00065C14.6663 4.31875 11.6816 1.33398 7.99967 1.33398C4.31778 1.33398 1.33301 4.31875 1.33301 8.00065C1.33301 11.6826 4.31778 14.6673 7.99967 14.6673ZM8.49967 5.33398C8.49967 5.05784 8.27582 4.83398 7.99967 4.83398C7.72353 4.83398 7.49967 5.05784 7.49967 5.33398V8.00065C7.49967 8.13326 7.55235 8.26044 7.64612 8.35421L9.31279 10.0209C9.50805 10.2161 9.82463 10.2161 10.0199 10.0209C10.2152 9.82561 10.2152 9.50903 10.0199 9.31376L8.49967 7.79354V5.33398Z"
                  fill="#DEDEE1"
                />
              </svg>
            }
            flex="1"
            {...dateTimeStyle}
          />
        )}
        <HStack
          flex="1"
          justifyContent="space-between"
          columnGap="4px"
          divider={
            <Text fontSize="md" color="gray.60" fontWeight="700">
              :
            </Text>
          }
        >
          {shows.day && (
            <TimerBox
              isDisabled={completed}
              isComplete={days === 0 && !completed}
              topText={days > 99 ? '+99' : days}
              bottomText="Day"
              background="cardBackground"
              px="6px"
              py="4px"
              {...timerStyle}
            />
          )}
          {shows.hour && (
            <TimerBox
              isDisabled={completed}
              isComplete={days === 0 && hours === 0 && !completed}
              topText={hours}
              bottomText="Hour"
              background="cardBackground"
              px="6px"
              py="4px"
              {...timerStyle}
            />
          )}
          {shows.min && (
            <TimerBox
              isDisabled={completed}
              isComplete={minutes === 0 && hours === 0 && !completed}
              topText={minutes}
              bottomText="Min"
              background="cardBackground"
              px="6px"
              py="4px"
              {...timerStyle}
            />
          )}
          {shows.sec && (
            <TimerBox
              isDisabled={completed}
              isComplete={minutes === 0 && hours === 0 && !completed}
              topText={seconds}
              bottomText="Sec"
              background="cardBackground"
              px="6px"
              py="4px"
              {...timerStyle}
            />
          )}
        </HStack>
      </HStack>
    );
  };

  const { isIntersecting, ref } = useIntersectionObserver(false, {
    threshold: 0.75,
    root: null,
  });
  const countDownRef = useRef<Countdown | null>(null);

  const lastOutOfViewTime = useRef(null);
  const [adjustedDate, setAdjustedDate] = useState(new Date(date).getTime());
  useEffect(() => {
    if (isIntersecting) {
      if (lastOutOfViewTime.current) {
        const timeElapsed = new Date().getTime() - lastOutOfViewTime.current;
        setAdjustedDate((prevDate) => prevDate - timeElapsed);
      }
      countDownRef.current?.start();
    } else {
      lastOutOfViewTime.current = new Date().getTime();
      countDownRef.current?.stop();
    }
  }, [isIntersecting]);

  return (
    <HStack
      bg="glassBackground"
      backdropFilter="blur(24px)"
      p="8px"
      ref={ref}
      width="full"
      borderRadius="8px"
      {...containerStyle}
    >
      <Countdown
        ref={countDownRef}
        autoStart={false}
        date={adjustedDate}
        renderer={renderer}
      />
    </HStack>
  );
};
