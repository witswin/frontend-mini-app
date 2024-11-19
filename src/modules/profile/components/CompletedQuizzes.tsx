import { userQuiz } from "@/globalTypes";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Confetti } from "solar-icon-set";
import { CompletedQuizCard } from "./CompletedQuizCard";
import Sleepy from "@/assets/sleepy.svg";
import { useAuth } from "@/hooks/useAuthorization";
import { useRouter } from "next/router";

export const CompletedQuizzes = ({ quizzes }: { quizzes: userQuiz[] }) => {
  const isEmpty = quizzes.length === 0;
  const unClaimedRewards =
    quizzes.filter((quiz) => quiz.txHash === "").length > 0;
  const selfUser = useAuth();
  const router = useRouter();

  const isSelfUser = selfUser?.pk
    ? router.query.id === selfUser?.pk.toString()
    : false;

  const showClaim = isSelfUser && unClaimedRewards;

  return (
    <VStack w="full" gap="16px" py={isEmpty ? "24px" : "0"}>
      {isEmpty ? (
        <>
          <Image src={Sleepy} alt="sleepy" />
          <Text fontSize="lg" color="gray.80" fontWeight={500}>
            No completed quizzes
          </Text>
        </>
      ) : (
        <>
          {/* Claim All for we don't use it cause it adds complexity in claim reward proccess*/}
          {showClaim && (
            <HStack
              w="full"
              borderRadius="10px"
              justifyContent="space-between"
              p="4px 4px 6px 12px"
              bg="rgba(32, 32, 51, 1)"
              position="relative"
              _before={{
                content: "''",
                position: "absolute",
                top: "-1px",
                left: "-1px",
                right: "-1px",
                height: "calc(100% + 2px)",
                width: "calc(100% + 2px)",
                background: "var(--chakra-colors-primaryRadial)",
                zIndex: -1,
                borderRadius: "10px",
              }}
            >
              <HStack>
                <Confetti iconStyle="Bold" color="gray.0" size={24} />
                <Text fontSize="sm" fontWeight="600" color="gray.0">
                  You have unclaimed prizes!
                </Text>
              </HStack>

              {/* <Button size="mini" onClick={() => {}}>
                Claim All
              </Button> */}
            </HStack>
          )}
          {quizzes.map((quiz) => {
            console.log(quiz.competition.startAt);
            return (
              <CompletedQuizCard
                key={quiz.competition.id}
                title={quiz.competition.title}
                amountWon={quiz.amountWon}
                date={new Date(quiz.competition?.startAt).getTime()}
                imgAddress={quiz.competition.image}
                isWinner={quiz.isWinner}
                user_competition_id={quiz.id}
                isClaimTriggered={quiz.isClaimTriggered}
                txHash={quiz.txHash}
                isSelfUser={isSelfUser}
                quizId={quiz.competition.id}
                profileId={selfUser.pk}
              />
            );
          })}
        </>
      )}
    </VStack>
  );
};
