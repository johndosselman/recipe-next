import handleSignOut from "@/auth/handleSignOut";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

export interface logOutDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function LogOutDialog(props: logOutDialogProps) {
  const { open, handleClose } = props;

  const router = useRouter();

  const handleLogOut = async () => {
    handleClose;
    await handleSignOut();
    return router.push("/");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Log out?</DialogTitle>
      <DialogActions>
        <Button onClick={handleLogOut}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
