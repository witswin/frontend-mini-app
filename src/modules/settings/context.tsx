import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"
import { Integrations, User } from "./types"

export type ProfileContextProps = {
  profile: User | null
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

  return (
    <ProfileContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={setState}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  )
}
