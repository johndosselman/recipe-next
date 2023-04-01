import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeContext } from "@/context/themeContext";
import LoggedInAvatarIcon from "./avatarIcon/loggedInAvatarIcon/loggedInAvatarIcon";
import LogInDialog from "./logInDialog/logInDialog";
import SignUpDialog from "./signUpDialog/signUpDialog";

export default function Navbar() {
  const credential = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };
  const handleOpenSignUpDialog = () => {
    setOpenSignUpDialog(true);
  };
  const handleCloseSignUpDialog = () => {
    setOpenSignUpDialog(false);
  };
  return (
    <>
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
              <LoggedInAvatarIcon />
            ) : (
              <Button color="inherit" onClick={handleOpenLoginDialog}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {credential.user === null && (
        <LogInDialog
          open={openLoginDialog}
          handleClose={handleCloseLoginDialog}
          handleOpenSignUpDialog={handleOpenSignUpDialog}
        />
      )}
      {credential.user === null && (
        <SignUpDialog
          open={openSignUpDialog}
          handleClose={handleCloseSignUpDialog}
          handleOpenLoginDialog={handleOpenLoginDialog}
        />
      )}
    </>
  );
}
