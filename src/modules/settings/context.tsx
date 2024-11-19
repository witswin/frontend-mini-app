import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"
import { Integrations } from "./types"
import { useQuery } from "@tanstack/react-query"
import { axiosClient } from "@/configs/axios"
import { UserProfile } from "@/types"
import { useAuth } from "@/hooks/useAuthorization"

export type ProfileContextProps = {
  profile: UserProfile | null
  connections: Integrations | null
}

export const ProfileContext = createContext<ProfileContextProps>({
  profile: null,
  connections: null,
})

export const ProfileDispatchContext =
  createContext<Dispatch<SetStateAction<ProfileContextProps>>>(undefined)

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ProfileContextProps>(undefined)
  const authInfo = useAuth()

  const { data } = useQuery({
    initialData: undefined,
    queryFn: () =>
      axiosClient
        .get("/auth/info/", {
          headers: {
            Authorization: `TOKEN ${authInfo?.token}`,
          },
        })
        .then((res) => res.data as UserProfile),
    queryKey: ["profile", authInfo],
  })

  const connectionPage = useQuery({
    initialData: undefined,
    queryKey: ["connections"],
    queryFn: () =>
      axiosClient.get("/auth/user/all-connections/").then((res) => res.data),
  })

  return (
    <ProfileContext.Provider
      value={{ profile: data, connections: connectionPage.data }}
    >
      <ProfileDispatchContext.Provider value={setState}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  )
}
