import { axiosClient } from "@/configs/axios"
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants"
import { useAuth, useAuthDispatch } from "@/hooks/useAuthorization"
import { UserProfile } from "@/types"
import { setCookie } from "cookies-next"
import { useRouter } from "next/router"
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react"

export const TelegramAuthContext = createContext({
  isWebApp: false,
  isLoginLoading: true,
})

export const TelegramAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWebApp, setIsWebApp] = useState(false)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const dispatch = useAuthDispatch()
  const auth = useAuth()
  const router = useRouter()

  // const loginWithTelegramWidget = () => {}

  const loginWithTelegramWebApp = useCallback(() => {
    if (!window.Telegram?.WebApp)
      throw new Error("[T] Telegram Web App must be injected")

    setIsLoginLoading(true)
    const payload = window.Telegram.WebApp.initData

    axiosClient
      .post<UserProfile>("/auth/telegram-login/", { telegramData: payload })
      .then(({ data }) => {
        setCookie(ACCESS_TOKEN_COOKIE_KEY, data.token)

        dispatch(data)
      })
      .finally(() => setIsLoginLoading(false))
  }, [dispatch])

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (!tg) return

    // Function to determine if back navigation is available
    const canGoBack = () => {
      return document.referrer !== "" // Checks if the page was accessed from another page
    }

    if (canGoBack()) {
      tg.BackButton.show() // Show the Telegram Back Button

      const onBack = () => {
        router.back() // Trigger Next.js router back navigation
      }

      tg.BackButton.onClick(onBack)

      return () => {
        tg.BackButton.offClick(onBack) // Cleanup listener
        tg.BackButton.hide() // Hide the button on unmount
      }
    } else {
      tg.BackButton.hide() // Hide the button if back is not available
    }
  }, [router])

  useEffect(() => {
    if (!window.Telegram?.WebApp || !window.Telegram.WebApp.initData) return

    setIsWebApp(true)

    if (auth) return
    loginWithTelegramWebApp()
  }, [auth, loginWithTelegramWebApp])

  return (
    <TelegramAuthContext.Provider
      value={{
        isWebApp,
        isLoginLoading,
      }}
    >
      {children}
    </TelegramAuthContext.Provider>
  )
}
