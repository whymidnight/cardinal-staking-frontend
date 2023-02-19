import type { IdlAccountData } from '@cardinal/rewards-center'
import { rewardsCenterProgram } from '@cardinal/rewards-center'
import { StakeEntryData } from '@cardinal/staking/dist/cjs/programs/stakePool'
import { getActiveStakeEntriesForPool } from '@cardinal/staking/dist/cjs/programs/stakePool/accounts'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { stakeEntryDataToV1, stakeEntryDataToV2 } from 'api/fetchStakeEntry'
import { asWallet } from 'common/Wallets'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'

import { TOKEN_DATAS_KEY } from './useAllowedTokenDatas'
import { isStakePoolV2, useStakePoolData } from './useStakePoolData'

export const useStakePoolEntries = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const { data: stakePoolData } = useStakePoolData()
  const wallet = useWallet()

  return useQuery<{ pubkey: PublicKey; parsed: StakeEntryData }[] | undefined>(
    [TOKEN_DATAS_KEY, 'useStakePoolEntries', stakePoolData?.pubkey?.toString()],
    async () => {
      return (
        await getActiveStakeEntriesForPool(
          secondaryConnection,
          stakePoolData?.pubkey!
        )
      ).map((entry) => {
        console.log(entry)
        return {
          pubkey: entry.pubkey,
          // FUTURE ME this is fucked since this is v2 stake entry
          // structure and does not yield imperative `stakedDuration`.
          parsed: stakeEntryDataToV1(entry.parsed),
        }
      })
    },
    { enabled: !!stakePoolData?.pubkey }
  )
}
