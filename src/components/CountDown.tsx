import { BoxProps, HStack, Text, VStack } from "@chakra-ui/react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ReactNode, useEffect, useRef } from "react";
import { CalendarMark, ClockCircle } from "solar-icon-set";

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
          color={topIcon ? "gray.40" : "gray.20"}
          {...(!topIcon && {
            width: "full",
            mx: "auto",
          })}
          {...(isComplete && {
            bg: "redRadial",
            sx: {
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          })}
          {...(isDisabled && {
            color: "gray.400",
          })}
        >
          {topText}
        </Text>
      </HStack>
      <HStack columnGap="4px" width="full">
        {bottomIcon}
        <Text
          fontWeight="600"
          fontSize={bottomIcon ? "13px" : "10px"}
          color={bottomIcon ? "gray.40" : "gray.60"}
          lineHeight="16px"
          {...(!bottomIcon && {
            width: "full",
            mx: "auto",
            textAlign: "center",
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
    const dateString = new Date(date)
      .toLocaleString("default", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
      .split(",");

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
            topText={dateString[0]}
            bottomText={dateString[1]}
            bottomIcon={
              <ClockCircle
                size={16}
                iconStyle="Bold"
                color="var(--chakra-colors-gray-40)"
              />
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
              topText={days}
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
              isComplete={minutes === 0 && seconds <= 10 && !completed}
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

  useEffect(() => {
    if (isIntersecting) {
      countDownRef.current?.start();
    } else {
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
        date={date}
        renderer={renderer}
      />
    </HStack>
  );
};
