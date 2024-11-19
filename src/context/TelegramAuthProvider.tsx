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

    if (tg) {
      // Show the Telegram Back Button
      tg.BackButton.show()

      const onBack = () => {
        router.back() // Trigger Next.js router back navigation
      }

      // Listen for Back Button clicks
      tg.BackButton.onClick(onBack)

      return () => {
        tg.BackButton.hide() // Cleanup on unmount
        tg.BackButton.offClick(onBack) // Remove the Back button click listener
      }
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
