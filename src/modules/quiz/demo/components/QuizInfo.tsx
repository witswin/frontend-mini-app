import { QuizPrize } from '@/components/QuizCard';
import { Box, Button, HStack, Img, Text, VStack } from '@chakra-ui/react';
import { ArticleCard } from '../../components/ArticleCard';
import dynamic from 'next/dynamic';
import { demoQuizData } from '@/constants';
import { useRouter } from 'next/router';

const CountDown = dynamic(
  () => import('@/components/CountDown').then((modules) => modules.CountDown),
  { ssr: false },
);
export const QuizInfo = () => {
  const router = useRouter();
  const data = demoQuizData;
  return (
    <>
      <VStack position="relative" rowGap="16px" width="full">
        <VStack
          bg="glassBackground"
          borderRadius="16px"
          p="16px"
          rowGap="16px"
          width="full"
        >
          <HStack justifyContent="space-between" width="full">
            <Box position="relative">
              <Img
                style={{ borderRadius: '50%' }}
                src={data?.image}
                alt={data?.title}
                width="80px"
                height="80px"
              />
            </Box>
            <VStack alignItems="flex-end" rowGap="0">
              <QuizPrize
                prize={data?.formattedPrize ? data?.formattedPrize : 0}
                unitPrize={data?.token}
              />
              <Text
                fontSize="sm"
                lineHeight="20px"
                fontWeight="600"
                color="gray.60"
              >
                Yours to Win!
              </Text>
            </VStack>
          </HStack>
          <VStack width="full" alignItems="flex-start" rowGap="4px">
            <Text
              color="gray.0"
              fontSize="2xl"
              fontWeight="600"
              fontFamily="kanit"
              lineHeight="28px"
            >
              {data?.title}
            </Text>
            <Text fontSize="md" lineHeight="22px" color="gray.60">
              {data?.details}
            </Text>
          </VStack>
          <CountDown
            shows={{
              day: true,
              hour: true,
              info: true,
              min: true,
              sec: true,
            }}
            date={new Date().getTime() + 1e15}
          />
        </VStack>
        {data?.resources
          ?.filter((article) => article.isActive)
          .map((article) => (
            <ArticleCard
              key={article.id}
              articleTitle={article.title}
              banner={article.image}
              content={article.content}
              link={article.link}
              linkText={article.linkText}
            />
          ))}
      </VStack>

      <Box
        py="10px"
        bg="blackGradient"
        zIndex={2}
        position="fixed"
        bottom="0px"
        left="50%"
        transform="translateX(-50%)"
        width="full"
        maxW="538px"
        px="16px"
      >
        <Button
          onClick={() => {
            router.push('/quiz/demo/match');
          }}
          width="full"
          size="lg"
          variant="solid"
        >
          Go to Quiz
        </Button>{' '}
      </Box>

      {/* <EnrolledCard /> */}
    </>
  );
};
