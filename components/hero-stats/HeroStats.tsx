import { BN } from '@project-serum/anchor'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakePoolEntries } from 'hooks/useStakePoolEntries'
import { useStakePoolMaxStaked } from 'hooks/useStakePoolMaxStaked'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { useStakePoolTotalStaked } from 'hooks/useStakePoolTotalStaked'

import { RewardsRate } from '@/components/hero-stats/RewardsRate'
import { TreasuryBalance } from '@/components/hero-stats/TreasuryBalance'

export const HeroStats: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolEntries = useStakePoolEntries()
  const maxStaked = useStakePoolMaxStaked()
  const totalStaked = useStakePoolTotalStaked()
  const { data: stakePoolMetadata } = useStakePoolMetadata()

  return (
    <div
      className={`flex w-full flex-col flex-wrap justify-evenly gap-y-5 rounded-xl bg-white bg-opacity-5
       px-12 py-6 md:flex-row ${className}`}
      style={{
        background: stakePoolMetadata?.colors?.backgroundSecondary,
        border: stakePoolMetadata?.colors?.accent
          ? `2px solid ${stakePoolMetadata?.colors?.accent}`
          : '',
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-lg text-medium-4">Total Staked</div>
        {!totalStaked.isFetched ? (
          <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
        ) : (
          <div className="text-center text-xl text-light-1">
            {totalStaked.data?.toLocaleString()}{' '}
            {stakePoolMetadata?.maxStaked
              ? `/ ${stakePoolMetadata?.maxStaked.toLocaleString()}`
              : ''}
          </div>
        )}
      </div>
      {maxStaked && (
        <>
          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-lg text-medium-4">Percent Staked</p>
            {!stakePoolEntries.data ? (
              <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
            ) : (
              <div className="text-center text-xl ">
                {stakePoolEntries.data?.length &&
                  Math.floor(
                    ((stakePoolEntries.data?.length * 100) / (maxStaked ?? 0)) *
                      10000
                  ) / 10000}
                %
              </div>
            )}
          </div>
        </>
      )}
      {rewardDistributorData.data && (
        <>
          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>
          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-lg text-medium-4">Treasury Balance (YrdXp)</p>
            <TreasuryBalance className="text-center text-xl text-light-1" />
            <p className="text-lg text-medium-4">
              Treasury Balance (catsIndex)
            </p>
            <TreasuryBalance className="text-center text-xl text-light-1" />
          </div>
        </>
      )}
    </div>
  )
}
