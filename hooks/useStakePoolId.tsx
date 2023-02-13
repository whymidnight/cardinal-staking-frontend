import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'

export const useStakePoolId = () => {
  const router = useRouter()
  // FIXME - verify `router.route` is actually a public key string
  // or `/publickey` string.
  // THIS NEEDS CORRECTNESS CHECK

  let stakePoolId: PublicKey | string | undefined = router.route

  if (!stakePoolId) stakePoolId = new PublicKey(stakePoolId)

  return stakePoolId
}
