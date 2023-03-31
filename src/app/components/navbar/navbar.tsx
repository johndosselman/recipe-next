import styles from "./navbar.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { ThemeContext } from "@/context/themeContext";

export default function Navbar() {
  const credential = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe App Title
          </Typography>
          {credential.user ? (
            <IconButton>
              {credential.user.photoURL ? (
                <Avatar src={credential.user.photoURL} />
              ) : (
                <Avatar>
                  {credential.user.email?.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </IconButton>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
