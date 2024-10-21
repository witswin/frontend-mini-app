import { ColorFullText } from "@/components/ColorFullText";
import { chakra, Text, VStack } from "@chakra-ui/react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MemoizedSwiperItem } from "../components/QuizItem";
import { EnrolledCard } from "../components/EnrolledCard";
import { axiosClient } from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { quizType } from "@/globalTypes";
import { Timer } from "../components/Timer";
import { useEffect, useState } from "react";

const ChakraSwiper = chakra(Swiper);

export const QuizPLP = () => {
  const { data } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () =>
      await axiosClient.get("quiz/competitions/").then((res) => res.data),
  });

  return (
    <VStack
      overflow="hidden"
      position="relative"
      justifyContent="center"
      width="full"
      height="full"
    >
      {/* <ColorFullText textContent="Quiz Space" fontSize="5xl" />
      <Text
        fontWeight="600"
        color="gray.60"
        fontSize="md"
        textAlign="center"
        mx="auto"
        mt="4px"
        mb="24px"
      >
        Find exciting quizzes to join and earn points!
      </Text>

      <ChakraSwiper
        py="2px"
        width="full"
        slidesPerView="auto"
        effect="coverflow"
        modules={[EffectCoverflow]}
        spaceBetween={0}
        centeredSlides
        initialSlide={1}
        grabCursor
        coverflowEffect={{
          rotate: 10,
          stretch: -20,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        sx={{
          ".swiper-slide": {
            mr: "0 !important",
            px: "4px",
          },
        }}
      >
        {data?.results?.map((quiz: quizType) => (
          <SwiperSlide key={quiz?.id} style={{ width: "fit-content" }}>
            <MemoizedSwiperItem quiz={quiz} />
          </SwiperSlide>
        ))}
      </ChakraSwiper>

      <EnrolledCard /> */}
      <Timer />
    </VStack>
  );
};
