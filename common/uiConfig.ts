import { PublicKey } from '@solana/web3.js';
import uiConfig from '../ui_config.json';

export interface UIConfig2 {

  faction: string;
  rewardDistributors: { [key: string]: RewardDistributor[] };

}

export interface RewardDistributor {
  label: Label;
  duration: number;
  rewardMint: RewardMint;
  rewardDistributorPda: string;
  distributorIndex: number;
}

export enum Label {
  Catsindex = "CATSINDEX",
  YrdXP = "YRD-XP",
}

export enum RewardMint {
  CGzMt7K1KYfVqNG2PHvqq7QXLckSHHKri8X5U2H64ULz = "CGzMt7K1KYfVqNG2PHvqq7QXLckSHHKri8x5u2h64uLz",
  The55ThbqpqCPLZUTKL24SJdpji2XJUhA46GtgaCCMKf616 = "55thbqpqCPLZUTKL24sJdpji2XJUhA46GtgaCCmKf616",
}
export const FACTIONS: string[] = Object.keys(uiConfig)



export const GLOBAL_CONFIG: UIConfig2[] = [
  uiConfig[FACTIONS[0]],
  uiConfig[FACTIONS[1]],
  uiConfig[FACTIONS[2]],
  uiConfig[FACTIONS![3]],


]

export const [NORTH, NORTH_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
export const [EAST, EAST_KEY] = [FACTIONS[1]!, new PublicKey(FACTIONS[1]!)]
export const [SOUTH, SOUTH_KEY] = [FACTIONS[2]!, new PublicKey(FACTIONS[2]!)]
export const [WEST, WEST_KEY] = [FACTIONS[3]!, new PublicKey(FACTIONS[3]!)]




