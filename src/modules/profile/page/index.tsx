import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Stat } from "../components/Stat";
import { WalletConnectedModal } from "../components/WalletConnectedModal";
import { RewardsClaimedModal } from "../components/RewardsClaimedModal";

export const Profile = () => {
  const [isWalletConnectedModalOpen, setIsWalletConnectedModalOpen] =
    useState(false);
  const [isRewardsClaimedOpen, setIsRewardsClaimedOpen] = useState(false);

  return (
    <VStack w="full" h="full" gap="16px" p="16px">
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
