import { Button, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HomeAngle2 } from 'solar-icon-set';
import { useFinishedData } from '../hooks';
import { useQuestionData } from '@/modules/question/hooks';

export const ResultBottomNavbar = () => {
  const finishedDataInfo = useFinishedData();
  const questionData = useQuestionData();

  const handleShareClaimTwitter = () => {
    const twitterUrl = !!finishedDataInfo?.winner
      ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `I won ${
            finishedDataInfo?.quizStats?.prizeToWin /
            10 ** questionData?.quiz?.tokenDecimals
          } from @@wits.win among ${
            finishedDataInfo?.quizStats?.totalParticipantsCount
          } participants. 🤩🎉
    Try your luck to win valuable prizes at `,
        )}&url=${encodeURIComponent(`wits.win`)}`
      : `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          ``,
        )}&url=${encodeURIComponent(`wits.win`)}`;
    window.open(twitterUrl, '_blank');
  };
  if (!!finishedDataInfo?.finishedData && !!finishedDataInfo?.quizStats) {
    return (
      <HStack
        px="16px"
        w="full"
        h="45px"
        gap="16px"
        position="fixed"
        bottom="8px"
        left="50%"
        transform="translateX(-50%)"
        maxWidth="538px"
      >
        <Button
          columnGap="6px"
          width="full"
          variant="solid"
          size="sm"
          as={Link}
          href="/"
        >
          <HomeAngle2
            color="var(--chakra-colors-gray-0)"
            iconStyle="Bold"
            size={20}
          />
          Back to Home
        </Button>

        <HStack w="full" gap="16px" paddingX="1px">
          <Button
            onClick={handleShareClaimTwitter}
            w="full"
            variant="outline"
            size="sm"
            gap="6px"
            color="gray.20"
          >
            Share on
            <Image
              src="/assets/images/result/brand-x.svg"
              alt="X logo"
              width={20}
              height={20}
            />
          </Button>
        </HStack>
      </HStack>
    );
  }
  return null;
};
