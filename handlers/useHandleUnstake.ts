import { withFindOrInitAssociatedTokenAccount } from '@cardinal/common'
import { unstake as unstakeV2 } from '@cardinal/rewards-center'
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
import { useEffect } from 'react'
import { TOKEN_DATAS_KEY } from '../hooks/useAllowedTokenDatas'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { isStakePoolV2, useStakePoolData } from '../hooks/useStakePoolData'
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
  useEffect(()=>{
    console.log('-----------------------------------------------------' + JSON.stringify(rewardDistributorData) )
  },[rewardDistributorData])
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
      const txs: Transaction[] = (
        await Promise.all(
          tokenDatas.map(async (token, i) => {
            try {
              if (!token || !token.stakeEntry) {
                throw new Error('No stake entry for token')
              }
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
              const transaction = new Transaction()
              if (i === 0 && ataTx.instructions.length > 0) {
                transaction.instructions = ataTx.instructions
              }
              let unstakeTx = new Transaction()
              if (!token.stakeEntry.parsed?.stakeMint)
                throw 'No stake mint found for stake entry'
              if (isStakePoolV2(stakePool.parsed!)) {
                if (!stakePool.parsed) throw 'No stake pool parsed data'
                const txs = await unstakeV2(
                  connection,
                  wallet,
                  stakePool.parsed?.identifier,
                  [{ mintId: token.stakeEntry.parsed?.stakeMint }],
                  rewardDistributorData.data
                    ? [rewardDistributorData.data?.pubkey]
                    : undefined
                ) // TODO Handle fungible
                if (txs[0]) {
                  unstakeTx = txs[0]
                }
              } else {
                // TODO need a helper function to unstake and
                // claim rewards from all reward distributors.
                // NEED TO BATCH!!!
                const distributorIDs = GLOBAL_CONFIG[
                  'E2oRXP6RAAnL3RUdPEgkjDpkMkHBrVAivt99uhBbfJ73'
                ]!.rewardDistributors

                console.log(distributorIDs)

                unstakeTx = await unstake(connection, wallet, {
                  distributorIds: distributorIDs['0']!.map((item)=> {return new BN(item.distributorIndex)}),
                  stakePoolId: new PublicKey('E2oRXP6RAAnL3RUdPEgkjDpkMkHBrVAivt99uhBbfJ73'),
                  originalMintId: token.stakeEntry.parsed?.stakeMint,
                  stakePoolDuration:60
                })
              }
              transaction.instructions = [
                ...transaction.instructions,
                ...unstakeTx.instructions,
              ]
              return transaction
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
      ).filter((x): x is Transaction => x !== null)

      const [firstTx, ...remainingTxs] = txs
      await executeAllTransactions(
        connection,
        wallet,
        ataTx.instructions.length > 0 ? remainingTxs : txs,
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
        },
        ataTx.instructions.length > 0 ? firstTx : undefined
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

