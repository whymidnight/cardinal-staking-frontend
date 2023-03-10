import React, { useEffect, useState } from 'react'
import { stakePoolMetadatas } from 'api/mapping'
import { Header } from 'common/Header'
import { PerformanceStats } from 'components/PerformanceStats'
import { StakePoolNotice } from 'components/StakePoolNotice'
import { useRewardDistributorsData } from 'hooks/useRewardDistributorData'
import { useStakedTokenDatas } from 'hooks/useStakedTokenDatas'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { useUserRegion } from 'hooks/useUserRegion'
import { UnstakedTokens } from '@/components/token-staking/unstaked-tokens/UnstakedTokens'
import { StakedTokens } from '@/components/token-staking/staked-tokens/StakedTokens'
import { useRouter } from 'next/router'
import { Box, Container, FormControl, MenuItem, Select } from '@mui/material'
import { HeroStats } from '@/components/hero-stats/HeroStats'
import North from '@/components/pools/north'
import East from '@/components/pools/east'
import West from '@/components/pools/west'
import South from '@/components/pools/south'

type PANE_OPTIONS = 'dashboard' | 'leaderboard'
const paneTabs: {
  label: React.ReactNode
  value: PANE_OPTIONS
  disabled?: boolean
  tooltip?: string
}[] = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    tooltip: 'View your personal dashboard',
  },
  {
    label: 'Leaderboard',
    value: 'leaderboard',
    tooltip: 'View top users in this pool',
  },
]

export default function StakePage(props: {
  stakePoolMetadataName: string | null
}) {
  const router = useRouter()
  const { isFetched: stakePoolLoaded } = useStakePoolData()
  const userRegion = useUserRegion()
  const rewardDistributorsData = useRewardDistributorsData()
  const stakedTokenDatas = useStakedTokenDatas()

  const [pane, setPane] = useState<PANE_OPTIONS>('dashboard')
  const stakePoolDisplayName = props.stakePoolMetadataName
    ? props.stakePoolMetadataName.replace(' Staking', '') + ' Staking'
    : 'Cardinal NFT Staking'

  const { data: stakePoolMetadata } = useStakePoolMetadata()

  const [age, setAge] = useState(0)
  const [place, setPlace] = useState('east')

  const handleChange = (event: any) => {
    setAge(event.target.value)
  }

  const getPlace = () => {
    let place = localStorage.getItem('place')
    setPlace(place!)
  }

  useEffect(() => {
    getPlace()
  }, [])

  useEffect(() => {
    console.log('index', rewardDistributorsData)
  }, [rewardDistributorsData])

  return (
    <>
      <Header />
      <Container
        /* @ts-ignore */
        maxWidth="2440px"
        sx={{
          pt: '15vh',

          minHeight: 'calc(100vh-600px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundImage: "url('/assets/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            gap: '20px',
            pb: '15vh',
          }}
        >
          {place === 'north' && <North />}
          {place === 'east' && <East />}
          {place === 'south' && <South />}
          {place === 'west' && <West />}
          <Box
            sx={{
              flex: '2',
              border: 'solid black 5px',
              bgcolor: 'rgba(0,0,0,0.8)',
              borderRadius: '10px',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div className="flex flex-col gap-4">
              {!!rewardDistributorsData.data &&
                !!stakedTokenDatas.data?.length && (
                  <div className="flex grow items-center justify-end">
                    <PerformanceStats token={'token1'} />
                    <PerformanceStats token={'token2'} />
                    <PerformanceStats token={'token3'} />
                  </div>
                )}
              <HeroStats />
              <StakePoolNotice />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <UnstakedTokens />
                <StakedTokens />
              </div>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>3 Month</MenuItem>
                    <MenuItem value={2}>6 Month</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(context: {
  params: { stakePoolId: string }
}) {
  const stakePoolId = context.params.stakePoolId
  if (!stakePoolId) return { props: { stakePoolMetadataName: null } }
  const stakePoolMetadata = stakePoolMetadatas.find(
    (p) =>
      p.name === stakePoolId.toString() ||
      p.stakePoolAddress.toString() === stakePoolId.toString()
  )
  if (!stakePoolMetadata) return { props: { stakePoolMetadataName: null } }
  return { props: { stakePoolMetadataName: stakePoolMetadata?.displayName } }
}
