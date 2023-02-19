import { Global } from '@emotion/react'
import { PublicKey } from '@solana/web3.js'
import uiConfig from '../ui_config.json'

export interface RewardDistributor {
  label: Label
  duration: number
  rewardMint: RewardMint
  rewardDistributorPda: string
  distributorIndex: number
}

export enum Label {
  Catsindex = 'CATSINDEX',
  YrdXP = 'YRD-XP',
}

export enum RewardMint {
  catsIndex = 'CGzMt7K1KYfVqNG2PHvqq7QXLckSHHKri8x5u2h64uLz',
  YrdXP = '55thbqpqCPLZUTKL24sJdpji2XJUhA46GtgaCCmKf616',
}
export const FACTIONS = Object.keys(uiConfig)

export interface UIConfig2 {
  [key: string]: {
    faction: string
    rewardDistributors: { [key: string]: RewardDistributor[] }
  }
}

export const [NORTH, NORTH_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
export const [EAST, EAST_KEY] = [FACTIONS[1]!, new PublicKey(FACTIONS[1]!)]
export const [SOUTH, SOUTH_KEY] = [FACTIONS[2]!, new PublicKey(FACTIONS[2]!)]
export const [WEST, WEST_KEY] = [FACTIONS[3]!, new PublicKey(FACTIONS[3]!)]

/*
export const GLOBAL_CONFIG: UIConfig2[] = [
  uiConfig[NORTH],
  uiConfig[EAST],
  uiConfig[SOUTH],
  uiConfig[WEST],


]

*/
//@ts-ignore
export const GLOBAL_CONFIG: UIConfig2 = uiConfig
