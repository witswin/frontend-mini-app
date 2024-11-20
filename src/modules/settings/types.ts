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
  isConnected?: boolean
}

export type TwitterConnection = Omit<
  TelegramConnection,
  "firstName" | "lastName"
>

export type DiscordConnection = TwitterConnection

export type FarcasterConnection = {
  id: number
  isConnected: boolean
}

export type Integrations = {
  Telegram?: TelegramConnection
  Twitter?: TwitterConnection
  Farcaster?: FarcasterConnection
  Discord?: DiscordConnection
}
