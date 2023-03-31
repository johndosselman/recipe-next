import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import signInEmail from "@/auth/signInEmail";
import signInGoogle from "@/auth/signInGoogle";
import Link from "next/link";

export interface logInDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function LogInDialog(props: logInDialogProps) {
  const { open, handleClose } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { result, error } = await signInEmail(email, password);
    if (error) {
      console.log(error);
    }
    return router.push("/");
  };

  const handleGoogleSignIn = async () => {
    const { result, error } = await signInGoogle();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push("/");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ fontSize: "2rem" }}>Let's get cooking.</DialogTitle>
      <DialogContent>
        <Divider>Sign in with provider</Divider>
        <IconButton sx={{ margin: "1rem" }} onClick={handleGoogleSignIn}>
          <GoogleIcon />
        </IconButton>

        <Divider>Sign in with Email</Divider>

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="email-field"
          label="Email Address"
          type="email"
          variant="standard"
          required
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="password-field"
          label="Password"
          type="password"
          variant="standard"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Log In</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
      <DialogContent>
        <Divider />
        <Typography>
          New? <Link href="signup">Create an account</Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
