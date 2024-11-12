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
import { GetServerSidePropsContext, NextPage } from "next";
import { config } from "@/configs/wagmi";
import { WagmiProvider } from "wagmi";
import { AuthProvider } from "@/context/auth";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants";
import { axiosClient } from "@/configs/axios";
import { auth } from "@/globalTypes";
import { WebSocketProvider } from "@/context/WebSocket";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  auth: auth;
};
function commonLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

export default function App({
  Component,
  pageProps,
  auth,
}: AppPropsWithLayout) {
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
              <AuthProvider auth={auth}>
                <WebSocketProvider>
                  {getLayout(<Component {...pageProps} />)}
                </WebSocketProvider>
              </AuthProvider>
            </SelectedQuizProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  const cookies = ctx.req?.cookies;
  if (!!cookies) {
    const accessToken = cookies[ACCESS_TOKEN_COOKIE_KEY];
    if (!accessToken) {
      return {
        auth: null,
      };
    }
    try {
      const response = await axiosClient.get("/auth/info/", {
        headers: {
          Authorization: `TOKEN ${accessToken}`,
        },
      });

      if (response.statusText === "OK") {
        return { auth: { ...response.data, token: accessToken } };
      }
    } catch (error) {
      console.log(error);

      return { auth: null };
    }
  }
  return { auth: null };
};
