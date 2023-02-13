import { UiConfig } from '@cardinal/staking/cli/config'
import { PublicKey } from '@solana/web3.js'
import uiConfig from '../ui_config.json'

export const GLOBAL_CONFIG: UiConfig = {
  ...uiConfig,
}

export const FACTIONS: string[] = Object.keys(GLOBAL_CONFIG)
export const [NORTH, NORTH_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
export const [EAST, EAST_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
export const [SOUTH, SOUTH_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
export const [WEST, WEST_KEY] = [FACTIONS[0]!, new PublicKey(FACTIONS[0]!)]
