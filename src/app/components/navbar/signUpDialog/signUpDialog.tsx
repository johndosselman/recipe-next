import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import signup from "@/auth/signup";

export interface SignUpDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOpenLoginDialog: () => void;
}

export default function SignUpDialog(props: SignUpDialogProps) {
  const { open, handleClose, handleOpenLoginDialog } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [retypedPasswordError, setRetypedPasswordError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("name@example.com");
  const [passwordHelper, setPasswordHelper] = useState(
    "8+ characters, 1 upper, 1 symbol"
  );
  const [retypedPasswordHelper, setRetypedPasswordHelper] = useState(" ");
  const [emailColor, setEmailColor] = useState<"primary" | "success">(
    "primary"
  );
  const [passwordColor, setPasswordColor] = useState<"primary" | "success">(
    "primary"
  );
  const [retypedPasswordColor, setRetypedPasswordColor] = useState<
    "primary" | "success"
  >("primary");

  const router = useRouter();
  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[^\w\d\s]).{8,128}$/;

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
    if (emailRegex.test(email)) {
      setEmailHelper(" ");
      setEmailColor("success");
    } else {
      setEmailHelper("name@example.com");
      setEmailColor("primary");
    }
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
    if (passwordRegex.test(e.target.value)) {
      setPasswordHelper(" ");
      setPasswordColor("success");
    } else {
      setPasswordHelper("8+ characters, 1 upper, 1 symbol");
      setPasswordColor("primary");
    }
  };

  const handleRetypedPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRetypedPassword(e.target.value);
    setRetypedPasswordError(false);
    if (e.target.value === password) {
      setRetypedPasswordHelper(" ");
      setRetypedPasswordColor("success");
    } else {
      setRetypedPasswordHelper(" Passwords must match");
      setRetypedPasswordColor("primary");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, error } = await signup(email, password);
    if (error) {
      console.log(error);
    }
    return router.push("/");
  };

  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailHelper("Invalid Email");
    } else {
      setEmailError(false);
      setEmailColor("success");
      setEmailHelper(" ");
    }
  };

  const handlePasswordBlur = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      setPasswordHelper("8+ characters, 1 upper, 1 symbol");
    } else {
      setPasswordError(false);
      setPasswordHelper(" ");
    }
  };

  const handleRetypedPasswordBlur = () => {
    if (password !== retypedPassword) {
      setRetypedPasswordError(true);
      setRetypedPasswordHelper("Passwords must match");
    } else {
      setRetypedPasswordError(false);
      setRetypedPasswordHelper(" ");
    }
  };
  const switchToSignIn = () => {
    handleClose();
    handleOpenLoginDialog();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          Welcome to the kitchen.
        </DialogTitle>
        <DialogContent>
          <Divider>Sign up with Email</Divider>
          <TextField
            onChange={handleEmailInput}
            id="email-field"
            label="Email Address"
            type="email"
            variant="standard"
            error={emailError}
            helperText={emailHelper}
            color={emailColor}
            onBlur={handleEmailBlur}
            inputProps={{ pattern: emailRegex.source }}
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
            color={passwordColor}
            onBlur={handlePasswordBlur}
            inputProps={{
              pattern: passwordRegex.source,
            }}
            required
          />
          <TextField
            onChange={handleRetypedPasswordInput}
            id="retyped-password-field"
            label="Retype Password"
            type="password"
            variant="standard"
            error={retypedPasswordError}
            helperText={retypedPasswordHelper}
            color={retypedPasswordColor}
            onBlur={handleRetypedPasswordBlur}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Sign Up</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <DialogContent>
          <Divider>Have an account?</Divider>
          <Button onClick={switchToSignIn}>Log In</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
