import type { PublicKey } from '@solana/web3.js'

export function StakePoolUpdate({}: {
  onSuccess?: (p: PublicKey | undefined) => void
}) {
  return <div className="flex w-full flex-col gap-4"></div>
}
