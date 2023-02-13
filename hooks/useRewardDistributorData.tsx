import type { AccountData } from '@cardinal/common'
import type {
  CardinalRewardsCenter,
  IdlAccountData,
} from '@cardinal/rewards-center'
import {
  fetchIdlAccount,
  findRewardDistributorId as findRewardDistributorIdV2,
} from '@cardinal/rewards-center'
import type { RewardDistributorData } from '@cardinal/staking/dist/cjs/programs/rewardDistributor'
import { getRewardDistributor } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/accounts'
import { findRewardDistributorId } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/pda'
import { BN } from '@project-serum/anchor'
import type {
  AllAccountsMap,
  IdlTypes,
  TypeDef,
} from '@project-serum/anchor/dist/cjs/program/namespace/types'
import { PublicKey } from '@solana/web3.js'
import { REWARD_QUERY_KEY } from 'handlers/useHandleClaimRewards'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'

import { useStakePoolData } from './useStakePoolData'

import { GLOBAL_CONFIG } from '../common/uiConfig'
import { useRouter } from 'next/router'

export const useRewardDistributorsData = () => {
  const router = useRouter()

  const stakePool = router.route
  const rewardDistributors = GLOBAL_CONFIG[stakePool]?.rewardDistributors.map(
    (_rewardDistributor) =>
      new PublicKey(_rewardDistributor.rewardDistributorPda)
  )!

  const { connection } = useEnvironmentCtx()
  const { data: stakePoolData } = useStakePoolData()
  return useQuery<
    Pick<IdlAccountData<'rewardDistributor'>, 'pubkey' | 'parsed'>[] | undefined
  >(
    [
      REWARD_QUERY_KEY,
      'useRewardDistributorData',
      stakePoolData?.pubkey?.toString(),
    ],
    async () => {
      if (!stakePoolData?.pubkey || !stakePoolData?.parsed) return
      const rewardDistributorsData = await Promise.all(
        rewardDistributors.map(async (_rewardDistributorId) => {
          return await getRewardDistributor(connection, _rewardDistributorId)
        })
      )

      return rewardDistributorsData.map((rewardDistributorData) => ({
        pubkey: rewardDistributorData.pubkey,
        parsed: rewardDistributorDataToV2(rewardDistributorData.parsed),
      }))
    },
    {
      enabled: !!stakePoolData?.pubkey,
      retry: false,
    }
  )
}

export const useRewardDistributorData = () => {
  const { data: stakePoolData } = useStakePoolData()
  return useQuery<
    Pick<IdlAccountData<'rewardDistributor'>, 'pubkey' | 'parsed'> | undefined
  >(
    [
      REWARD_QUERY_KEY,
      'useRewardDistributorData',
      stakePoolData?.pubkey?.toString(),
    ],
    async () => {
      return undefined
    },
    {
      enabled: !!stakePoolData?.pubkey,
      retry: false,
    }
  )
}

export const isRewardDistributorV2 = (
  rewardDistributorData: (
    | RewardDistributorData
    | TypeDef<
      AllAccountsMap<CardinalRewardsCenter>['rewardDistributor'],
      IdlTypes<CardinalRewardsCenter>
    >
  ) & { type?: 'v1' | 'v2' }
): boolean =>
  !('maxSupply' in rewardDistributorData || rewardDistributorData.type === 'v1')

export const rewardDistributorDataToV2 = (
  rewardDistributorData:
    | RewardDistributorData
    | TypeDef<
      AllAccountsMap<CardinalRewardsCenter>['rewardDistributor'],
      IdlTypes<CardinalRewardsCenter>
    >
): TypeDef<
  AllAccountsMap<CardinalRewardsCenter>['rewardDistributor'],
  IdlTypes<CardinalRewardsCenter>
> & { type: 'v1' | 'v2' } => {
  if (!('identifier' in rewardDistributorData)) {
    const rwdData = rewardDistributorData as RewardDistributorData
    return {
      bump: rwdData.bump,
      stakePool: rwdData.stakePool,
      kind: rwdData.kind,
      // TODO FIX THIS.
      authority: rwdData.stakePool,
      identifier: new BN(0),
      rewardMint: rwdData.rewardMint,
      rewardAmount: rwdData.rewardAmount,
      rewardDurationSeconds: rwdData.rewardDurationSeconds,
      rewardsIssued: rwdData.rewardsIssued,
      defaultMultiplier: rwdData.defaultMultiplier,
      multiplierDecimals: rwdData.multiplierDecimals,
      claimRewardsPaymentInfo: PublicKey.default,
      maxRewardSecondsReceived: rwdData.maxRewardSecondsReceived,
      type: 'v1',
    }
  }
  return { ...rewardDistributorData, type: 'v2' }
}

export const rewardDistributorDataToV1 = (
  rewardDistributorData:
    | AccountData<RewardDistributorData>
    | Pick<IdlAccountData<'rewardDistributor'>, 'pubkey' | 'parsed'>
): AccountData<RewardDistributorData> => {
  if (!rewardDistributorData.parsed) throw 'No parsed reward distributor data'
  if (isRewardDistributorV2(rewardDistributorData.parsed)) {
    return {
      pubkey: rewardDistributorData.pubkey,
      parsed: {
        index: 0,
        bump: rewardDistributorData.parsed.bump,
        stakePool: rewardDistributorData.parsed.stakePool,
        kind: rewardDistributorData.parsed.kind,
        // TODO FIX THIS.
        rewardAuthority: rewardDistributorData.parsed.rewardMint,
        rewardMint: rewardDistributorData.parsed.rewardMint,
        rewardAmount: rewardDistributorData.parsed.rewardAmount,
        rewardDurationSeconds:
          rewardDistributorData.parsed.rewardDurationSeconds,
        rewardsIssued: rewardDistributorData.parsed.rewardsIssued,
        maxSupply: null,
        defaultMultiplier: rewardDistributorData.parsed.defaultMultiplier,
        multiplierDecimals: rewardDistributorData.parsed.multiplierDecimals,
        maxRewardSecondsReceived:
          rewardDistributorData.parsed.maxRewardSecondsReceived,
      },
    }
  }
  return rewardDistributorData as AccountData<RewardDistributorData>
}
