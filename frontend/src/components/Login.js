import React, { useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Link,
    Stack,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetPasswordAuth, signInAuth, auth, getSignedInUserInfoFB } from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = ({ handleChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    async function handleLogin() {
        if (!(email && password)) {
            alert("Fill in all fields!");
        } else {
            try {
                await signInAuth(email, password).then(async () => {
                    const info = await getSignedInUserInfoFB(user.uid);
                    if (info.didRequirements) 
                        navigate('/home');
                    else navigate("/verify")
                });
            } catch (err) {
                console.log(err);
                alert("Invalid username or password!");
            }
        }
    }

    async function handleReset() {
        if (!resetEmail) {
            alert("Please fill in all fields");
        } else {
            try {
                setOpen(false);
                await resetPasswordAuth(resetEmail).then(() =>
                    alert("Success! Check your spam folder for the reset email")
                );
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Grid>
            <Paper style={{ padding: 20, width: 450, margin: "0 auto" }}>
                <Grid align="center">
                    <h2>Volunteer Login</h2>
                </Grid>
                <TextField
                    label="Email"
                    placeholder="Enter email"
                    margin="dense"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <Stack spacing={2}>
                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        margin="dense"
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        onClick={handleLogin}
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={{ margin: "8px 0" }}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Stack direction={"row"} justifyContent="space-between">
                        <Link href="#" onClick={handleClickOpen}>
                            Forgot password?
                        </Link>
                        <Stack direction={"row"} justifyContent="space-between">
                            <Link href="#" onClick={() => handleChange(false)}>
                                Sign Up
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <Dialog open={open}>
                    <DialogTitle>Send Reset Password Link</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Email Address"
                            type="email"
                            required
                            fullWidth
                            placeholder="Enter your email"
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReset}>Send Email</Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            color="error"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Grid>
    );
};

export default Login;
