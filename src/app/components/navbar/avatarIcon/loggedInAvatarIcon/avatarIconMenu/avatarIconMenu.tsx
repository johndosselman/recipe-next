import { AuthContext } from "@/context/AuthContext";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { Typography } from "@mui/material";
import LogOutDialog from "../logOutDialog/logOutDialog";

type MenuProps = {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  open: boolean;
};

export default function AvatarIconMenu(props: MenuProps) {
  const credential = useContext(AuthContext);
  const { anchorEl, handleClose, open } = props;

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };
  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ margin: "0 1rem 1rem" }}>
            {credential.user!.displayName ?? credential.user!.email}
          </Typography>

          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenLogoutDialog}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <LogOutDialog
        open={openLogoutDialog}
        handleClose={handleCloseLogoutDialog}
      />
    </>
  );
}
