import Box from '@mui/material/Box'

import { Button, Container, Grid, LinearProgress } from '@mui/material'

import { Header } from 'common/Header'
import {
  NORTH,
  EAST,
  SOUTH,
  WEST,
  FACTIONS,
  GLOBAL_CONFIG,
} from 'common/uiConfig'
import { useRouter } from 'next/router'
import zIndex from '@mui/material/styles/zIndex'

const NorthButton = () => {
  const router = useRouter()
  const gotoStake = (place: string) => {
    localStorage.setItem('place', place)
  }

  return (
    <Button
      className="freefont"
      onClick={() => {
        gotoStake('north')
        router.push(NORTH)
      }}
      sx={{
        textTransform: 'none',
        fontSize: '18px',
        color: 'black',
        fontWeight: '700',
        display: 'flex',
        flexDirection: 'column',
        pb: '0px',
      }}
    >
      <img src={'/assets/north.png'} />
    </Button>
  )
}

const EastButton = () => {
  const router = useRouter()
  const gotoStake = (place: string) => {
    localStorage.setItem('place', place)
  }

  return (
    <Button
      className="freefont"
      onClick={() => {
        gotoStake('east')
        router.push(EAST)
      }}
      sx={{
        textTransform: 'none',
        fontSize: '18px',
        color: 'black',
        fontWeight: '700',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img src={'/assets/east.png'} style={{}} />
    </Button>
  )
}

const WestButton = () => {
  const router = useRouter()
  const gotoStake = (place: string) => {
    localStorage.setItem('place', place)
  }

  return (
    <Button
      className="freefont"
      onClick={() => {
        gotoStake('west')
        router.push(WEST)
      }}
      sx={{
        textTransform: 'none',
        fontSize: '18px',
        color: 'black',
        fontWeight: '700',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img src={'/assets/west.png'} />
    </Button>
  )
}

const SouthButton = () => {
  const router = useRouter()
  const gotoStake = (place: string) => {
    localStorage.setItem('place', place)
  }

  return (
    <Button
      className="freefont"
      onClick={() => {
        gotoStake('south')
        router.push(SOUTH)
      }}
      sx={{
        textTransform: 'none',
        fontSize: '18px',
        color: 'black',
        fontWeight: '700',
        display: 'block',
        pt: '0px',
      }}
    >
      <img src={'/assets/south.png'} />
    </Button>
  )
}
export default function Homepage() {
  return (
    <>
      <Container
        /* @ts-ignore */
        maxWidth="2440px"
        sx={{
          minHeight: '100vh',
          maxHeight: 'calc(100vh)',

          backgroundImage: "url('/assets/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <Box
          sx={{
            pt: '10vh',
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'column',
            justifyContent: 'center',

            backgroundSize: 'cover',
            backgroundPosition: 'fixed',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'myFont',
          }}
        >
          <Box
            sx={{
              display: 'flex',

              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                flex: '3',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '45px',
                color: 'white',
              }}
            >
              Choose Faction
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: '10px',
              flexDirection: { xs: 'column', md: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              justifyContent={'center'}
              alignItems={'center'}
              sx={{
                zIndex: '9',
                //display:"flex",

                //backgroundSize:"100%",
                //backgroundRepeat: "no-repeat",
                //backgroundPosition:"center",
                backgroundColor: 'rgba(255,255,255,0.6)',
                padding: '20px',
                boxShadow: '0px 1px 1px 3px rgba(0,0,0,0.3)',
                backgroundImage: "url('/assets/whitebg.png')",
                backgroundPosition: 'center',
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat',
                maxWidth: '500px',
                borderRadius: '2em',
                width: { md: 500 },
                border: 'none',
              }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '' }}></div>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NorthButton />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '' }}></div>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WestButton />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={'/assets/arrow.png'} style={{ width: '70%' }} />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EastButton />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '' }}></div>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SouthButton />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '' }}></div>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  fontFamily: 'arial',
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: '1.3em',
                  bgcolor: 'rgba(0,255,200,0.9)',
                  padding: '40px',
                  margin: '20px',
                  borderRadius: '10px',
                  zIndex: '5',
                  boxShadow: '0px 1px 1px 2px rgba(0,30,0,0.1)',
                }}
              >
                Cats Staked: 1616/3333
                <Box sx={{ width: '100%' }}>
                  <LinearProgress
                    variant="determinate"
                    value={50}
                    color="success"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/*
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <img src={Alice} style={{ width: "100%" }} />
              <Typography
                sx={{ color: "black", fontWeight: "700", fontSize: "15px" }}
              >
                01 - Proem & Down the Rabbit-hole
              </Typography>
              <Typography
                sx={{ color: "black", fontWeight: "400", fontSize: "11px" }}
              >
                Alice in Wonderland - Lewis Carroll
              </Typography> */}
        {/*}
              <Spotify link="https://open.spotify.com/track/5ihDGnhQgMA0F0tk9fNLlA?si=4472348a63dd4f83" />
            </Box>
            */}
        <img
          src={'/assets/cat.png'}
          style={{
            position: 'fixed',
            top: '55%',
            zIndex: '1',
            overflow: 'hidden',
          }}
        />
      </Container>
    </>
  )
}
