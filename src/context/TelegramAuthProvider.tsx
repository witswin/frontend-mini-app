import { axiosClient } from "@/configs/axios"
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants"
import { useAuth, useAuthDispatch } from "@/hooks/useAuthorization"
import { UserProfile } from "@/types"
import { setCookie } from "cookies-next"
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
    if (!window.Telegram?.WebApp.initData) return

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
