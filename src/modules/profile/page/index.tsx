import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Stat } from "../components/Stat";
import { WalletConnectedModal } from "../components/WalletConnectedModal";
import { RewardsClaimedModal } from "../components/RewardsClaimedModal";
import { Info } from "../components/Info";

export const Profile = () => {
  const [isWalletConnectedModalOpen, setIsWalletConnectedModalOpen] =
    useState(false);
  const [isRewardsClaimedOpen, setIsRewardsClaimedOpen] = useState(false);

  const userInfo = {
    userName: "S Zare",
    telegramId: "@s_zare1998",
    walletAddress: "0x6083c198e36564ADd85CF47408152A9819Fa4567",
    imgAddress: "",
    isOwnProfile: true,
    neuronsCount: 0,
  };

  return (
    <VStack w="full" h="full" gap="16px" p="16px">
      <Info userInfo={userInfo} />
      <Stat rank={1} quizzes={28} winRate={2} />
      <WalletConnectedModal
        isOpen={isWalletConnectedModalOpen}
        onClose={() => setIsWalletConnectedModalOpen(false)}
      />
      <RewardsClaimedModal
        isOpen={isRewardsClaimedOpen}
        onClose={() => setIsRewardsClaimedOpen(false)}
      />
    </VStack>
  );
};
