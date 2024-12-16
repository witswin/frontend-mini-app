import { EnrolledModalProvider } from '@/modules/quiz/context';
import { Index } from '@/modules/quiz/pdp/page';
import { prefetchSSRData } from '@/utils';
import { Box, Container } from '@chakra-ui/react';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import QRCode from 'qrcode';
import Head from 'next/head';
import path from 'path';

const HintProvider = dynamic(
  () =>
    import('@/modules/question/context').then(
      (modules) => modules.HintProvider,
    ),
  { ssr: false },
);
interface QuizPDPProps {
  dehydratedState: DehydratedState;
  qrCodeBase64: string;
  fullUrl: string;
}
const QuizPDP = ({ dehydratedState, qrCodeBase64, fullUrl }: QuizPDPProps) => {
  return (
    <>
      <Head>
        <meta property="og:title" content="Check out this quiz!" />
        <meta
          property="og:description"
          content="Join this quiz now and test your knowledge!"
        />
        <meta property="og:image" content={`${qrCodeBase64}`} />
        <meta property="og:url" content={fullUrl} />
      </Head>
      <HydrationBoundary state={dehydratedState}>
        <EnrolledModalProvider>
          <HintProvider>
            <Index />
          </HintProvider>
        </EnrolledModalProvider>
      </HydrationBoundary>
    </>
  );
};

export default QuizPDP;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const fullUrl = ctx.req.headers.host + ctx.resolvedUrl;

  const quizId = query?.id as string;
  const queryClient = new QueryClient();

  const qrCodeBase64 = await QRCode.toDataURL(fullUrl as string, {
    errorCorrectionLevel: 'H',
    width: 256,
  });
  const filePath = path.resolve('./public', 'qr-code.png');

  console.log({filePath});
  
  await QRCode.toFile(filePath, fullUrl, {
    errorCorrectionLevel: 'H',
    width: 256,
  });

  await prefetchSSRData(
    ['quiz', quizId],
    `/quiz/competitions/${quizId}/`,
    queryClient,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      qrCodeBase64,
      fullUrl,
    },
  };
};

QuizPDP.getLayout = function getLayout(page: ReactElement) {
  return (
    <Container
      py="8px"
      maxWidth="538px"
      zIndex={1}
      gap="16px"
      display="flex"
      height="full"
      px="16px"
      minH="calc(100vh - 122px)"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Box width="full">{page}</Box>
    </Container>
  );
};
