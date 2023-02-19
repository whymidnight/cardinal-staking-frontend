import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'

export const useStakePoolId = () => {
  const {
    query: { stakePoolId },
  } = useRouter()

  return new PublicKey(stakePoolId!.toString())
}
