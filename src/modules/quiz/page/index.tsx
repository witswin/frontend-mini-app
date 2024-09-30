import { ColorFullText } from "@/components/ColorFullText";
import { chakra, Text, VStack } from "@chakra-ui/react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MemoizedSwiperItem } from "../components/QuizItem";
import { AnimatePresence } from "framer-motion";
import { EnrolledCard } from "../components/EnrolledCard";
import { useEnrolledModalProps } from "../hooks";

const ChakraSwiper = chakra(Swiper);

export const QuizPLP = () => {
  const { isOpen } = useEnrolledModalProps();

  return (
    <VStack overflow="hidden" position="relative" justifyContent="center" width="full">
      <ColorFullText textContent="Quiz Space" fontSize="5xl" />
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
        spaceBetween={16}
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
      >
        {[0, 1, 2, 3, 4].map((quiz) => (
          <SwiperSlide key={quiz} style={{ width: "fit-content" }}>
            <MemoizedSwiperItem />
          </SwiperSlide>
        ))}
      </ChakraSwiper>
      <AnimatePresence>{isOpen && <EnrolledCard />}</AnimatePresence>
    </VStack>
  );
};
