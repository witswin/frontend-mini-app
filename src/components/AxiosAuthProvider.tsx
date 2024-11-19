import { axiosClient } from "@/configs/axios"
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants"
import { useAuth } from "@/hooks/useAuthorization"
import { getCookie } from "cookies-next"
import { FC, useEffect } from "react"

export const AxiosAuthProvider: FC = () => {
  const auth = useAuth()

  useEffect(() => {
    const cookie = getCookie(ACCESS_TOKEN_COOKIE_KEY)
    if (!cookie) return

    axiosClient.defaults.headers.common["Authorization"] = `TOKEN ${cookie}`
  }, [auth])

  return null
}
