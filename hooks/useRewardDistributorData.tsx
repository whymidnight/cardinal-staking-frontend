import type { AccountData } from '@cardinal/common'
import type {
  CardinalRewardsCenter,
  IdlAccountData,
} from '@cardinal/rewards-center'
import type { RewardDistributorData } from '@cardinal/staking/dist/cjs/programs/rewardDistributor'
import { getRewardDistributor } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/accounts'
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
import { useStakePoolId } from './useStakePoolId'

export const useRewardDistributorsData = (duration?: string) => {
  const stakePool = useStakePoolId()
  const faction = GLOBAL_CONFIG[stakePool.toString()]
  const durations = !!duration
    ? [duration]
    : Object.keys(GLOBAL_CONFIG![stakePool.toString()]!.rewardDistributors)

  const { connection } = useEnvironmentCtx()
  const { data: stakePoolData } = useStakePoolData()
  return useQuery<
    Pick<IdlAccountData<'rewardDistributor'>, 'pubkey' | 'parsed'>[] | undefined
  >(
    [
      REWARD_QUERY_KEY,
      'useRewardDistributorsData',
      faction,
      durations,
      stakePool,
    ],
    async () => {
      let _rewardDistributorsData = []
      for (const _duration of durations) {
        console.log(_duration);
        for (const _reward_distributor of faction?.rewardDistributors![
          _duration
        ]!) {
          _rewardDistributorsData.push({
            fetched: await getRewardDistributor(
              connection,
              new PublicKey(_reward_distributor.rewardDistributorPda)
            ),
            duration: _duration,
            })
        }
      }

      return _rewardDistributorsData.map((_rewardDistributorData) => ({
        pubkey: _rewardDistributorData.fetched.pubkey,
        parsed: rewardDistributorDataToV2(_rewardDistributorData.fetched.parsed),
        duration: _rewardDistributorData.duration,
      }))
    },
    {
      enabled: !!stakePoolData?.pubkey,
      retry: false,
    }
  )
}

export const useRewardDistributorData = () => {
  const { connection } = useEnvironmentCtx()
  const key = new PublicKey('EHmJVFDdWdG9qpjwEX9FZJwf7Pkxu6ZrLqdUUMhyx7vK')
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
      const rewardDistributorData = await getRewardDistributor(connection, key)
      return {
        pubkey: key,
        parsed: rewardDistributorDataToV2(rewardDistributorData.parsed),
      }
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
        // NOTE NOT SURE IF IMPACTFUL BUT IS BREAKING WITHOUT
        stakePoolDuration: 0,
      },
    }
  }
  return rewardDistributorData as AccountData<RewardDistributorData>
}
