
import React, { useEffect, useState } from "react";
import { stakePoolMetadatas } from 'api/mapping'
import { Footer } from 'common/Footer'
import { FooterSlim } from 'common/FooterSlim'
import { Header } from 'common/Header'
import { HeroLarge } from 'common/HeroLarge'
import { Info } from 'common/Info'
import { TabSelector } from 'common/TabSelector'
import { contrastColorMode } from 'common/utils'
import { AttributeAnalytics } from 'components/AttributeAnalytics'
import { PerformanceStats } from 'components/PerformanceStats'
import { StakePoolLeaderboard } from 'components/StakePoolLeaderboard'
import { StakePoolNotice } from 'components/StakePoolNotice'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakedTokenDatas } from 'hooks/useStakedTokenDatas'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { useUserRegion } from 'hooks/useUserRegion'
import { UnstakedTokens } from "@/components/token-staking/unstaked-tokens/UnstakedTokens";
import { StakedTokens } from "@/components/token-staking/staked-tokens/StakedTokens";
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { HeroStats } from "@/components/hero-stats/HeroStats";


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


export default function StakePage(props: {stakePoolMetadataName: string | null}) {



    const router = useRouter()
  const { isFetched: stakePoolLoaded } = useStakePoolData()
  const userRegion = useUserRegion()
  const rewardDistributorData = useRewardDistributorData()
  const stakedTokenDatas = useStakedTokenDatas()
  const [pane, setPane] = useState<PANE_OPTIONS>('dashboard')
  const stakePoolDisplayName = props.stakePoolMetadataName
    ? props.stakePoolMetadataName.replace(' Staking', '') + ' Staking'
    : 'Cardinal NFT Staking'
  console.log('stakePoolDisplayName', stakePoolDisplayName)

  const { data: stakePoolMetadata } = useStakePoolMetadata()

  const [age, setAge] = useState(0);
  const [place, setPlace] = useState("east");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getPlace = () => {
    //let place = localStorage.getItem("place");
    setPlace('place');
  };

  useEffect(() => {
    getPlace();
  }, []);

  return (<>
<Header/>
    <Container
      maxWidth="xl"
      sx={{
        mt: "13vh",
        mb: "50px",
        minHeight: "calc(100vh - 248px)",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs:"column", sm:"row"},
          width: "100%",
          gap: "20px",
        }}
      >
        {place === "east" ? (
          <Box
            sx={{
              flex: "1",
              bgcolor: "#179151BD",
              borderRadius: "7.5px",
              padding: "22px",
            }}
          >
            <img src={'assets/place/east.png'} style={{ width: "100%" }} />
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              East
            </Typography>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                None - 5 $YRD-XP per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                5 Month Lock - 7.5 $YRD-XP + 125 $LUV per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                10 Month Lock - 10 $YRD-XP + 375 $LUV per day
              </Box>
            </Box>
        ) : place === "west" ? (
          <Box
            sx={{
              flex: "1",
              bgcolor: "#179151BD",
              borderRadius: "7.5px",
              padding: "22px",
            }}
          >
            <img src={'/assets/place/west.png'} style={{ width: "100%" }} />
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              West
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Box sx={{ fontSize: "12px", fontWeight: "700" }}>
                Staked At West Out Of Total: -
              </Box>
              <Box></Box>
              <Box sx={{ fontSize: "12px", fontWeight: "700" }}>
                Faction Votes: -
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                Time Lock Period
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                None - 5 $YRD-XP per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                5 Month Lock - 7.5 $YRD-XP + 125 $LUV per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                10 Month Lock - 10 $YRD-XP + 375 $LUV per day
              </Box>
            </Box>
          </Box>
        ) : place === "south" ? (
          <Box
            sx={{
              flex: "1",
              bgcolor: "#179151BD",
              borderRadius: "7.5px",
              padding: "22px",
            }}
          >
            <img src={'/assets/place/south.png'} style={{ width: "100%" }} />
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              South
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Box sx={{ fontSize: "12px", fontWeight: "700" }}>
                Staked At South Out Of Total: 100%
              </Box>
              <Box></Box>
              <Box sx={{ fontSize: "12px", fontWeight: "700" }}>
                Faction Votes: 1
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                Time Lock Period
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                None - 5 $YRD-XP per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                5 Month Lock - 7.5 $YRD-XP + 125 $LUV per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                10 Month Lock - 10 $YRD-XP + 375 $LUV per day
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              flex: "1",
              bgcolor: "#179151BD",
              borderRadius: "7.5px",
              padding: "22px",
              maxWidth:"400px",
            }}
          >
            <img src={'/assets/place/north.png'} style={{ width: "100%" }} />
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              North
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Box sx={{ fontSize: "12px", fontWeight: "700" }}>
                Rewards:
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                None - 5 $YRD-XP per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                5 Month Lock - 7.5 $YRD-XP + 125 $LUV per day
              </Box>
              <Box sx={{ fontSize: "17px", fontWeight: "700" }}>
                10 Month Lock - 10 $YRD-XP + 375 $LUV per day
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            flex: "2",
            border: "4px solid #53AC7B",
            borderRadius: "10px",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
              <div className="flex flex-col gap-4">
                {!!rewardDistributorData.data &&
                  !!stakedTokenDatas.data?.length && (
                        <div className="flex grow items-center justify-end">
                          <PerformanceStats />
                        </div>
                  )}
    <HeroStats/>
                <StakePoolNotice />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <UnstakedTokens />
                  <StakedTokens />
                </div>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
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
  </>);
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