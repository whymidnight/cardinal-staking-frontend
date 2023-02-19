import type { IdlAccountData, RewardEntry } from '@cardinal/rewards-center'
import {
  fetchIdlAccountDataById,
  findRewardEntryId as findRewardEntryIdV2,
} from '@cardinal/rewards-center'
import { getRewardEntries } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/accounts'
import { findRewardEntryId } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/pda'
import { StakeEntryData } from '@cardinal/staking/dist/cjs/programs/stakePool'
import { rewardEntryDataToV2 } from 'api/fetchRewardEntry'
import { REWARD_QUERY_KEY } from 'handlers/useHandleClaimRewards'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'

import {
  isRewardDistributorV2,
  useRewardDistributorData,
  useRewardDistributorsData,
} from './useRewardDistributorData'
import { useStakedTokenDatas } from './useStakedTokenDatas'

export const useRewardsEntries = (stakedDuration: string) => {
  const { data: rewardDistributorsData } =
    useRewardDistributorsData(stakedDuration)
  const { data: stakedTokenDatas } = useStakedTokenDatas()
  const { secondaryConnection } = useEnvironmentCtx()
  const { connection } = useEnvironmentCtx()

  return useQuery<
    Pick<IdlAccountData<'rewardEntry'>, 'pubkey' | 'parsed'>[] | undefined
  >(
    [
      REWARD_QUERY_KEY,
      'useRewardEntries',
      rewardDistributorsData,
      stakedTokenDatas?.map((s) => s.stakeEntry?.pubkey.toString()).join(','),
    ],
    async () => {
      let rewardsEntries = []
      console.log('wersdists', rewardDistributorsData)
      for (const rewardDistibutorData of rewardDistributorsData!) {
        const rewardDistibutorId = rewardDistibutorData?.pubkey
        console.log('wersdist', rewardDistibutorId)
        if (
          !rewardDistibutorData ||
          !stakedTokenDatas ||
          !rewardDistibutorId ||
          !rewardDistibutorData.parsed
        ) {
          console.log(
            'werds',
            !rewardDistibutorData,
            !stakedTokenDatas,
            !rewardDistibutorId,
            !rewardDistibutorData.parsed
          )
          return []
        }

        const stakeEntryIds = stakedTokenDatas
          .filter((tk) => tk && tk.stakeEntry)
          .map((tk) => tk.stakeEntry!)
          .map((entry) => entry.pubkey)
        const rewardEntryIds = await Promise.all(
          stakeEntryIds.map(async (stakeEntryId) =>
            findRewardEntryId(rewardDistibutorId, stakeEntryId)
          )
        )

        const rewardEntries = await getRewardEntries(
          secondaryConnection,
          rewardEntryIds
        )

        rewardsEntries.push(
          ...rewardEntries
            .filter((rewardEntry) => rewardEntry.parsed)
            .map((entry) => {
              return {
                pubkey: entry.pubkey,
                parsed: rewardEntryDataToV2(entry.parsed),
              }
            })
        )
      }
      return rewardsEntries
    }
  )
}
export const useRewardEntries = () => {
  const { data: rewardDistibutorData } = useRewardDistributorData()
  const { data: stakedTokenDatas } = useStakedTokenDatas()
  const { secondaryConnection } = useEnvironmentCtx()
  const { connection } = useEnvironmentCtx()

  return useQuery<
    Pick<IdlAccountData<'rewardEntry'>, 'pubkey' | 'parsed'>[] | undefined
  >(
    [
      REWARD_QUERY_KEY,
      'useRewardEntries',
      rewardDistibutorData?.pubkey?.toString(),
      stakedTokenDatas?.map((s) => s.stakeEntry?.pubkey.toString()).join(','),
    ],
    async () => {
      const rewardDistibutorId = rewardDistibutorData?.pubkey
      if (
        !rewardDistibutorData ||
        !stakedTokenDatas ||
        !rewardDistibutorId ||
        !rewardDistibutorData.parsed
      ) {
        return []
      }

      const stakeEntryIds = stakedTokenDatas
        .filter((tk) => tk && tk.stakeEntry)
        .map((tk) => tk.stakeEntry!)
        .map((entry) => entry.pubkey)
      if (isRewardDistributorV2(rewardDistibutorData.parsed)) {
        const rewardEntryIds = await Promise.all(
          stakeEntryIds.map(async (stakeEntryId) =>
            findRewardEntryIdV2(rewardDistibutorId, stakeEntryId)
          )
        )

        const idlData = await fetchIdlAccountDataById(
          connection,
          rewardEntryIds
        )
        const rewardEntryData = Object.values(idlData).reduce(
          (acc, account) => {
            if (account.type === 'rewardEntry') {
              return [...acc, account]
            }
            return acc
          },
          [] as RewardEntry[]
        )

        return rewardEntryData
      } else {
        const rewardEntryIds = await Promise.all(
          stakeEntryIds.map(async (stakeEntryId) =>
            findRewardEntryId(rewardDistibutorId, stakeEntryId)
          )
        )

        return (await getRewardEntries(secondaryConnection, rewardEntryIds))
          .filter((rewardEntry) => rewardEntry.parsed)
          .map((entry) => {
            return {
              pubkey: entry.pubkey,
              parsed: rewardEntryDataToV2(entry.parsed),
            }
          })
      }
    }
  )
}
