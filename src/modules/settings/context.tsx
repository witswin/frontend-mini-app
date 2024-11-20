import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
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
  createContext<Dispatch<SetStateAction<undefined>>>(undefined)

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const authInfo = useAuth()

  const { data, refetch } = useQuery({
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
      <ProfileDispatchContext.Provider
        value={() => {
          connectionPage.refetch()
          refetch()
        }}
      >
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  )
}
