
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button, Container, Slider, Stack } from "@mui/material";
import { Header } from "common/Header";
//import { Router, useNavigate } from "react-router-dom";
import Spotify from "react-spotify-embed";

import { useRouter } from 'next/router';


export default function Homepage() {
  const theme = useTheme();
  //const navigate = useNavigate();
  const router = useRouter()
  const gotoStake = (place) => {
   // localStorage.setItem("place", place);
    //navigate("/stake");
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "calc(100vh - 263px)" }}>
    <Header/>
      <Box sx={{ 
        mt: "20vh", 
        display: { xs: "flex", md: "grid" },
        flexDirection: "column",
        justifyContent:"center",
         
        fontFamily: "myFont",
        }}>
        <Box sx={{ display: "flex", justifyContent:"center" }}>
          <Box sx={{ flex: "3", justifyContent:"center", display: "flex", flexDirection:"column", alignItems:"center" }}>
            <Box
              sx={{
                fontFamily: "myFont",
                fontSize: "80px",
                fontWeight: "bold",
              }}
            >
              The Resort
            </Box>
            <Box sx={{ fontSize: "30px", color: "#179151", fontWeight: "400" }}>
              Choose your faction to stake
            </Box>
          </Box>
        </Box>
        <Box sx={{ 
          display: "flex", 
          mt: "30px", 
          flexDirection:{xs: "column", md: "column"}, 
          justifyContent:"center",

          }}>
            <Box sx={{ 
            flex: "5", 
            margin:"0", 
            display:"flex",
            justifyContent:"center", 
            //backgroundImage: "url('/assets/background.png')", 
            maxWidth:"700px",
            borderRadius:"2em",
            border: "none",
            height: "40vh"
            }}>
              <Button
                className="freefont"
                onClick={() => router.push("/72snEhn3vXMGf9VFS3sNBa2KEhjfjtzGdHo9TRKZRVuF?cluster=devnet")}
                sx={{
                fontFamily: "myFont",
                  textTransform: "none",
                  fontSize: "48px",
                  color: "black",
                  fontWeight: "700",
                  display:"flex",
                  flexDirection:"column",
                  padding: "20px"
                }}
              >
                North
                <img src={'/assets/north.png'} />
              </Button>
              <Button
                className="freefont"
                onClick={() => gotoStake("east")}
                sx={{
                fontFamily: "myFont",
                  textTransform: "none",
                  fontSize: "48px",
                  color: "black",
                  fontWeight: "700",
                  display:"flex",
                  flexDirection:"column",
                  padding: "20px"
                }}
              >
                East
                <img src={'/assets/east.png'} />
              </Button>
              <Button
                className="freefont"
                onClick={() => gotoStake("west")}
                sx={{
                fontFamily: "myFont",
                  textTransform: "none",
                  fontSize: "48px",
                  color: "black",
                  fontWeight: "700",
                  display:"flex",
                  flexDirection:"column",
                  padding: "20px"
                }}
              >
                West
                <img src={'/assets/west.png'} />
              </Button>
              <Button
                className="freefont"
                onClick={() => gotoStake("south")}
                sx={{
                fontFamily: "myFont",
                  textTransform: "none",
                  fontSize: "48px",
                  color: "black",
                  fontWeight: "700",
                  display:"flex",
                  flexDirection:"column",
                  padding: "20px"
                }}
              >
                South
                <img src={'/assets/south.png'} />
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent:"center" }}>
              <Box
                sx={{
                  fontFamily:"arial",
                  color: "#000000",
                  fontWeight: "700",
                  fontSize: "1.3em",
                }}
              >
                Cats Staked: 0/3333
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
    </Container>
  );
}
