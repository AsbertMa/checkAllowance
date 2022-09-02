import { Ref } from 'vue'
export interface Token {
  name: string
  symbol: string
  address: string
  balance: string
  decimals: number
  icon?: string
}

export type IconProps = {
  url: string
}

export type InjectWallet = {
  wallet: Ref<string>
  requestWallet: () => Promise<void>
}

export type InjectBest = Ref<number>

export type ApprovalItem = {
  address: string
  amount: string
}
