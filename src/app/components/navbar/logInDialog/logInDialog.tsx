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
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useState } from "react";
import signInEmail from "@/auth/signInEmail";
import signInGoogle from "@/auth/signInGoogle";
import signInFacebook from "@/auth/signInFacebook";
import signInGithub from "@/auth/signInGithub";
import Link from "next/link";

export interface logInDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOpenSignUpDialog: () => void;
}

export default function LogInDialog(props: logInDialogProps) {
  const { open, handleClose, handleOpenSignUpDialog } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelper, setEmailHelper] = useState(" ");
  const [passwordHelper, setPasswordHelper] = useState(" ");
  const router = useRouter();

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmailHelper(" ");
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPasswordHelper(" ");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signInEmail(email, password);
    if (result) {
      if (result === "auth/invalid-email") {
        setEmailError(true);
        setEmailHelper("Invalid Email");
      } else if (result === "auth/wrong-password") {
        setPasswordError(true);
        setPasswordHelper("Wrong password");
      } else if (result === "auth/user-not-found") {
        setEmailError(true);
        setEmailHelper("Account not found");
      } else console.log(result);
      return;
    }

    return router.push("/");
  };

  const handleGoogleSignIn = async () => {
    const { result, error } = await signInGoogle();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    handleClose();
    return router.push("/");
  };
  const handleFacebookSignIn = async () => {
    const { result, error } = await signInFacebook();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    handleClose();
    return router.push("/");
  };
  const handleGithubSignIn = async () => {
    const { result, error } = await signInGithub();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    handleClose();
    return router.push("/");
  };

  const switchToSignUp = () => {
    handleClose();
    handleOpenSignUpDialog();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          Let&apos;s get cooking.
        </DialogTitle>
        <DialogContent>
          <Divider>Sign in with provider</Divider>
          <IconButton sx={{ margin: "1rem" }} onClick={handleGoogleSignIn}>
            <GoogleIcon />
          </IconButton>
          <IconButton sx={{ margin: "1rem" }} onClick={handleFacebookSignIn}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ margin: "1rem" }} onClick={handleGithubSignIn}>
            <GitHubIcon />
          </IconButton>

          <Divider>Sign in with Email</Divider>

          <TextField
            onChange={handleEmailInput}
            id="email-field"
            label="Email Address"
            type="email"
            variant="standard"
            error={emailError}
            helperText={emailHelper}
            required
          />
          <TextField
            onChange={handlePasswordInput}
            id="password-field"
            label="Password"
            type="password"
            variant="standard"
            error={passwordError}
            helperText={passwordHelper}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Log In</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <DialogContent>
          <Divider>New to App Name?</Divider>

          <Button onClick={switchToSignUp}>Create an Account</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
