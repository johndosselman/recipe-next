import { AuthContext } from "@/context/AuthContext";
import { Avatar, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import AvatarIconMenu from "./avatarIconMenu/avatarIconMenu";

export default function LoggedInAvatarIcon() {
  const credential = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton id="avatar-icon-button" onClick={handleAvatarClick}>
        {credential.user!.photoURL ? (
          <Avatar alt="User avatar" src={credential.user!.photoURL} />
        ) : (
          <Avatar>{credential.user!.email?.charAt(0).toUpperCase()}</Avatar>
        )}
      </IconButton>
      <AvatarIconMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={Boolean(anchorEl)}
      ></AvatarIconMenu>
    </>
  );
}
