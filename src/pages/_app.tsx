import { baseTheme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode, useState } from "react";
import { Layout } from "@/components/Layout";
import { CircularPattern } from "@/components/CircularPattern";
import { SelectedQuizProvider } from "@/modules/quiz/context";
import { NextPage } from "next";
import { config } from "@/configs/wagmi";
import { WagmiProvider } from "wagmi";
import { AuthProvider } from "@/context/auth";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function commonLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component?.getLayout || commonLayout;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 10000,
          },
        },
      })
  );
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>Wits</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ChakraProvider theme={baseTheme}>
        <CircularPattern />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <SelectedQuizProvider>
              <AuthProvider>
                {getLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </SelectedQuizProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </>
  );
}
