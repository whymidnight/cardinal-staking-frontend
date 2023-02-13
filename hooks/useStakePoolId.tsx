import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'
import { useStakePoolMetadataCtx } from '../providers/StakePoolMetadataProvider'
import { useQuery }from 'react-query'
import { tryPublicKey } from '@cardinal/common'

export const useStakePoolId = () => {
  const stakePoolMetadata = useStakePoolMetadataCtx()
    const {
        query: { stakePoolId },
          } = useRouter()

            return useQuery(
                [
                      'useStakePoolId',
                       stakePoolId?.toString(),
                       stakePoolMetadata.data?.stakePoolAddress.toString(),
                  ],
                                          async () => {
                                                if (stakePoolMetadata.data)
                                                        return new PublicKey(stakePoolMetadata.data.stakePoolAddress)
                                                              return tryPublicKey(stakePoolId) ?? null
                                                                  }
                                                                    )
                                                                    }
