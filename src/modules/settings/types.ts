export type Wallet = {
  walletAddress: string
  createdAt: string
  pk: number
}

export type User = {
  pk: number
  username?: string
  image?: string
  firstName?: string
  lastName?: string
  wallets: Wallet[]
}

export type TelegramConnection = {
  id: number
  username?: string
  firstName?: string
  lastName?: string
}

export type Integrations = {
  Telegram?: TelegramConnection
}
