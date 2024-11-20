import { UserProfile } from "@/types"

export type UserConnection = {
  [key: string]: {
    id: number
    userProfile: UserProfile
    createdAt: string
    isConnected: boolean
  }
}

export type TelegramConnection = {
  id: number
  username?: string
  firstName?: string
  lastName?: string
}

export type TwitterConnection = Omit<
  TelegramConnection,
  "firstName" | "lastName"
>

export type Integrations = {
  Telegram?: TelegramConnection
  Twitter?: TwitterConnection
}
