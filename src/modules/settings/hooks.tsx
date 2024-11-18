import { useContext } from "react"
import { ProfileContext, ProfileDispatchContext } from "./context"

export const useProfile = () => useContext(ProfileContext)
export const useProfileDispatch = () => useContext(ProfileDispatchContext)
