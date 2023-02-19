import { withFindOrInitAssociatedTokenAccount } from '@cardinal/common'
import { withClaimRewards } from '@cardinal/staking/dist/cjs/programs/rewardDistributor/transaction'
import { unstake } from '@cardinal/staking'
import BN from 'bn.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { executeAllTransactions } from 'api/utils'
import { notify } from 'common/Notification'
import { GLOBAL_CONFIG } from 'common/uiConfig'
import { asWallet } from 'common/Wallets'
import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas'
import { useMutation, useQueryClient } from 'react-query'
import { TOKEN_DATAS_KEY } from '../hooks/useAllowedTokenDatas'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useStakePoolData } from '../hooks/useStakePoolData'
import { useStakePoolId } from '../hooks/useStakePoolId'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'
import { PublicKey } from '@saberhq/solana-contrib'
export const useHandleUnstake = (callback?: () => void) => {
  const wallet = asWallet(useWallet())
  const { connection } = useEnvironmentCtx()
  const queryClient = useQueryClient()
  const { data: stakePool } = useStakePoolData()
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolId = useStakePoolId()
  return useMutation(
    async ({
      tokenDatas,
    }: {
      tokenDatas: StakeEntryTokenData[]
    }): Promise<string[]> => {
      if (!stakePoolId) throw 'Stake pool not found'
      if (!wallet.publicKey) throw 'Wallet not connected'
      if (!stakePool || !stakePool.parsed) throw 'Stake pool not found'

      const ataTx = new Transaction()
      if (rewardDistributorData.data && rewardDistributorData.data.parsed) {
        // create user reward mint ata
        await withFindOrInitAssociatedTokenAccount(
          ataTx,
          connection,
          rewardDistributorData.data.parsed.rewardMint,
          wallet.publicKey,
          wallet.publicKey
        )
      }

      let coolDown = false
      const txs = (
        await Promise.all(
          tokenDatas.map(async (token, i) => {
            try {
              console.log('try')
              if (!token || !token.stakeEntry) {
                throw new Error('No stake entry for token')
              }
              console.log('try0')
              if (
                stakePool.parsed?.cooldownSeconds &&
                !token.stakeEntry?.parsed?.cooldownStartSeconds &&
                !stakePool.parsed.minStakeSeconds
              ) {
                notify({
                  message: `Cooldown period will be initiated for ${token.metaplexData?.data.data.name}`,
                  description: 'Unless minimum stake period unsatisfied',
                  type: 'info',
                })
                coolDown = true
              }
              console.log('try1')
              const transaction = new Transaction()
              if (i === 0 && ataTx.instructions.length > 0) {
                // transaction.instructions = ataTx.instructions
              }
              console.log('try2')
              let unstakeTx = new Transaction()
              if (!token.stakeEntry.parsed?.stakeMint)
                throw 'No stake mint found for stake entry'
              // TODO need a helper function to unstake and
              // claim rewards from all reward distributors.
              // NEED TO BATCH!!!
              const distributorIDs =
                GLOBAL_CONFIG[stakePoolId.toString()]!.rewardDistributors

              console.log('distIds', distributorIDs)
              console.log(
                'stake mint',
                token.stakeEntry.parsed?.stakeMint.toString()
              )

              unstakeTx = await unstake(connection, wallet, {
                // FIXME use reward distributors hook
                distributorIds: distributorIDs['0']!.map((item) => {
                  return new BN(item.distributorIndex)
                }),
                stakePoolId,
                originalMintId: token.stakeEntry.parsed?.stakeMint,
                stakePoolDuration: 0,
              })
              transaction.instructions = [
                ...transaction.instructions,
                ...unstakeTx.instructions,
              ]

              // FIXME use reward distributors hook
              const rewardTxs = await Promise.all(
                distributorIDs!['0']!.map(async (dist) => {
                  return await withClaimRewards(
                    new Transaction(),
                    connection,
                    wallet,
                    {
                      distributorId: new BN(dist.distributorIndex),
                      stakePoolId,
                      stakeEntryId: token.stakeEntry?.pubkey!,
                      lastStaker: wallet.publicKey,
                      stakePoolDuration: 0,
                    }
                  )
                })
              )

              return [transaction, ...rewardTxs!]
            } catch (e) {
              console.log(e)
              notify({
                message: `${e}`,
                description: `Failed to unstake token ${token?.stakeEntry?.pubkey.toString()}`,
                type: 'error',
              })
              return null
            }
          })
        )
      ).filter((x) => x !== null)

      await executeAllTransactions(
        connection,
        wallet,
        [...txs.flatMap((t) => t!)],
        {
          confirmOptions: {
            skipPreflight: true,
          },
          notificationConfig: {
            message: `Successfully ${
              coolDown ? 'initiated cooldown' : 'unstaked'
            }`,
            description: 'These tokens are now available in your wallet',
          },
        }
      )
      return []
    },
    {
      onSuccess: () => {
        queryClient.resetQueries([TOKEN_DATAS_KEY])
        if (callback) callback()
      },
      onError: (e) => {
        notify({ message: 'Failed to unstake', description: `${e}` })
      },
    }
  )
}
