import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import Homepage from '../components/Homepage'
import StakePoolHome from './[stakePoolId]'

export const pool_configuration = {
  stake_pool_north: { id: '72snEhn3vXMGf9VFS3sNBa2KEhjfjtzGdHo9TRKZRVuF' },
  stake_pool_east: { id: '72snEhn3vXMGf9VFS3sNBa2KEhjfjtzGdHo9TRKZRVuF' },
  stake_pool_south: { id: '72snEhn3vXMGf9VFS3sNBa2KEhjfjtzGdHo9TRKZRVuF' },
  stake_pool_west: { id: '72snEhn3vXMGf9VFS3sNBa2KEhjfjtzGdHo9TRKZRVuF' },
}
function Home() {
  const { stakePoolMetadata } = useStakePoolMetadataCtx()
  return <Homepage />
}

export default Home
