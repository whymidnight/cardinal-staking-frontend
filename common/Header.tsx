
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../assets/catsyard.io.png";
import yardPaper from "../assets/sealed document.png";
import Twitter from "../assets/twitter logo.png";
import Discord from "../assets/discord.png";
import Website from "../assets/website.png";
import walletIcon from "../assets/walletIcon.png";
import { useNavigate } from "react-router-dom";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { setVisible } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "@mui/material";

const pages = ["Yardpaper", "Twitter", "Discord", "Website"];
const settings = ["Disconnect"];

export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Home = () => {
    //navigate("/");
  };

  const { setVisible } = useWalletModal();

  const connect = () => {
    setVisible(true);
  };

  const { connected, publicKey, disconnect } = useWallet();

  const DisconnectWallet = () => {
    disconnect();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={Home}
          >
            <img src={'/assets/catsyard.io.png'} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={'/assets/catsyard.io.png'} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
            <Link
              target="_blank"
              href="https://yardpaper.gitbook.io/yardpaper/catsyard-dive-in/the-yard-mission"
              underline="none"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#000000",
                display: "flex",
                textTransform: "none",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <img src={'/assets/sealed document.png'} style={{ height: "40px" }} />
              Yardpaper
            </Link>
            <Link
              target="_blank"
              href="https://twitter.com/CatsYardNFT"
              underline="none"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#000000",
                display: "flex",
                textTransform: "none",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <img src={'assets/twitter logo.png'} style={{ height: "40px" }} />
              Twitter
            </Link>
            <Link
              target="_blank"
              href="https://discord.com/invite/vBhmbvSB25"
              underline="none"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#000000",
                display: "flex",
                textTransform: "none",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <img src={'/assets/discord.png'} style={{ height: "40px" }} />
              Discord
            </Link>
            <Link
              target="_blank"
              href="https://catsyard.io/"
              underline="none"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#000000",
                display: "flex",
                textTransform: "none",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <img src={'/assets/website.png'} style={{ height: "40px" }} />
              Website
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {connected && publicKey ? (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "black",
                    borderRadius: "15px",
                    fontSize: "12px",
                    ml: "20px",
                    textTransform: "none",
                  }}
                  onClick={handleOpenUserMenu}
                >
                  <img src={'/assets/walletIcon.png'} />
                  {publicKey.toBase58().slice(0, 4)}..
                  {publicKey.toBase58().slice(-4)}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "black",
                    borderRadius: "15px",
                    fontSize: "12px",
                    ml: "20px",
                    textTransform: "none",
                  }}
                  onClick={connect}
                >
                  <img src={'/assets/walletIcon.png'} />
                  Connect Wallet
                </Button>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={DisconnectWallet}>
                <Typography textAlign="center">Disconnect</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

