import { BN } from '@project-serum/anchor'
import {
  formatAmountAsDecimal,
  formatMintNaturalAmountAsDecimal,
} from 'common/units'
import { useMintInfo } from 'hooks/useMintInfo'
import {
  useRewardDistributorData,
  useRewardDistributorsData,
} from 'hooks/useRewardDistributorData'
import { useRewardMintInfo } from 'hooks/useRewardMintInfo'
import { useRewards } from 'hooks/useRewards'
import { useRewardsRate, useRewardsRates } from 'hooks/useRewardsRate'
import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useState, useEffect } from 'react'
import { StakedStatWrapper } from '@/components/token-staking/staked-tokens/StakedStatWrapper'
import { TokenStatCooldownValue } from '@/components/token-staking/token-stats/values/TokenStatCooldownValue'
import { TokenStatMinimumStakeTimeValue } from '@/components/token-staking/token-stats/values/TokenStatMinimumStakeTimeValue'
import { StakeEntryData } from '@cardinal/staking/dist/cjs/programs/stakePool'
import { rewardDistributor } from '@cardinal/staking'

export function StakedStats({
  tokenData,
  stakeEntryData,
}: {
  tokenData: StakeEntryTokenData
  stakeEntryData: StakeEntryData
}) {
  const { data: rewardDistributorsData } = useRewardDistributorsData(
    String(stakeEntryData.stakedDuration)
  )
  const rewardMintInfo = useRewardMintInfo()
  const mintInfo = useMintInfo(
    tokenData.stakeEntry?.parsed?.amount.gt(new BN(1))
      ? tokenData.stakeEntry?.parsed.stakeMint
      : undefined
  )

  const { data: stakePool } = useStakePoolData()
  // const rewardsRate = useRewardsRate()
  const rewardsRates = useRewardsRates(stakeEntryData)
  const rewards = useRewards()
  const [isLocked, setisLocked] = useState<boolean>(false)
  useEffect(() => {
    if (stakeEntryData.stakedDuration !== 0 || null) {
      setisLocked(true)
    }
  }, [rewardDistributorsData])

  return (
    <div className="flex flex-wrap items-center space-y-0.5 p-2">
      {tokenData.stakeEntry &&
        tokenData.stakeEntry.parsed?.amount.gt(new BN(1)) &&
        rewardMintInfo.data && (
          <StakedStatWrapper>
            <span>Amount:</span>
            <span className="text-right">
              {mintInfo.data
                ? formatAmountAsDecimal(
                    mintInfo.data?.decimals,
                    tokenData.stakeEntry && tokenData.stakeEntry.parsed.amount,
                    mintInfo.data?.decimals
                  )
                : 1}
            </span>
          </StakedStatWrapper>
        )}
      {/*
            iterate over rewards rates
          */}
      {rewardsRates.data?.length}
      {rewardsRates.data &&
        rewardsRates.data.map((rewardRate) => (
          <>
            {tokenData.stakeEntry && rewardMintInfo.data && (
              <StakedStatWrapper>
                {isLocked && <div>LOCKED</div>}

                <span>Reward rate:</span>
                <span className="text-right">
                  {formatAmountAsDecimal(
                    rewardMintInfo.data.mintInfo.decimals,
                    rewardDistributorsData?.filter(
                      (rewardDistributorData) =>
                        rewardDistributorData.parsed.rewardMint.toString() ===
                        rewardMintInfo.data?.mintInfo.address.toString()
                    )[0]?.parsed.rewardAmount || new BN(0), // max of 5 decimals
                    Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
                  )}{' '}
                  {/* parse´reward distributor `rewardDurationSeconds` seconds to human readable */}
                  / day
                </span>
              </StakedStatWrapper>
            )}
            {tokenData.stakeEntry && rewardMintInfo.data && (
              <StakedStatWrapper>
                <span>Claim:</span>
                <span className="text-right">
                  {formatMintNaturalAmountAsDecimal(
                    rewardMintInfo.data.mintInfo,
                    rewards.data?.rewardMap[
                      tokenData.stakeEntry.pubkey.toString()
                    ]?.claimableRewards || new BN(0),
                    // max of 5 decimals
                    Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
                  ).toLocaleString()}
                </span>
              </StakedStatWrapper>
            )}
          </>
        ))}
      {!!tokenData.stakeEntry?.parsed?.cooldownStartSeconds &&
        !!stakePool?.parsed?.cooldownSeconds && (
          <StakedStatWrapper>
            <span>Cooldown:</span>
            <span className="text-right">
              <TokenStatCooldownValue tokenData={tokenData} />
            </span>
          </StakedStatWrapper>
        )}
      {!!stakePool?.parsed?.minStakeSeconds &&
        !!tokenData.stakeEntry?.parsed?.lastStakedAt && (
          <StakedStatWrapper>
            <span>Min Time:</span>
            <span className="text-right">
              <TokenStatMinimumStakeTimeValue tokenData={tokenData} />
            </span>
          </StakedStatWrapper>
        )}
    </div>
  )
}
