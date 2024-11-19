import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Stat } from "../components/Stat";
import { WalletConnectedModal } from "../components/WalletConnectedModal";

import { Info } from "../components/Info";
import { Quizzes } from "../components/Quizzes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { axiosClient } from "@/configs/axios";
import { profileInfo, profileStats, userQuiz } from "@/globalTypes";

export const Profile = () => {
  const [isWalletConnectedModalOpen, setIsWalletConnectedModalOpen] =
    useState(false);

  const { query } = useRouter();
  const profileId = query?.id as string;

  const { data: statsData } = useQuery<profileStats>({
    queryKey: ["stats", profileId],
    queryFn: async () =>
      await axiosClient
        .get(`/auth/users/${profileId}/stats/`)
        .then((res) => res.data),
  });

  const { data: infoData } = useQuery<profileInfo>({
    queryKey: ["profile", profileId],
    queryFn: async () =>
      await axiosClient
        .get(`/auth/users/${profileId}/`)
        .then((res) => res.data),
  });

  const { data: quizData } = useQuery<userQuiz[]>({
    queryKey: ["user_quizzes", profileId],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/${profileId}/competitions/`)
        .then((res) => res.data),
  });

  return (
    <VStack w="full" h="full" gap="16px" p="16px">
      <Info userInfo={infoData} />
      <Stat userStats={statsData} />
      <Quizzes quizzes={quizData} />

      <WalletConnectedModal
        isOpen={isWalletConnectedModalOpen}
        onClose={() => setIsWalletConnectedModalOpen(false)}
      />
    </VStack>
  );
};
