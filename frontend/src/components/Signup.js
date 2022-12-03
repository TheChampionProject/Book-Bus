import React, { useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleChange }) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();

    async function handleSignup() {
        if (!(first && last && email && password && confirmPassword)) {
            alert("Fill in all fields!");
        } else if (confirmPassword !== password) {
            alert("Passwords do not match up!");
        } else {
            try {
                await axios
                    .post(process.env.REACT_APP_BACKEND_URL + "signup", {
                        email: email,
                        password: password,
                        first: first,
                        last: last,
                    })
                    .then(() => {
                        navigate("/verification");
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Grid>
            <Paper style={{ padding: 20, width: 450, margin: "0 auto" }}>
                <Grid align="center">
                    <h2>Volunteer Sign Up</h2>
                    <Typography variant="caption">
                        Register to become a verified volunteer of The Champion
                        Project!
                    </Typography>
                </Grid>
                <Stack direction={"row"} justifyContent="space-between">
                    <TextField
                        onChange={(e) => setFirst(e.target.value)}
                        label="First Name"
                        placeholder="Enter your name"
                        margin="dense"
                    />
                    <TextField
                        onChange={(e) => setLast(e.target.value)}
                        label="Last Name"
                        placeholder="Enter your name"
                        margin="dense"
                    />
                </Stack>
                <TextField
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    placeholder="Enter your email"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Enter your password"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    margin="dense"
                />
                <Button
                    fullWidth
                    onClick={handleSignup}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "8px 0" }}
                >
                    Sign up
                </Button>
                <Stack direction={"row"} justifyContent="space-between">
                    <Typography>Already have an account?</Typography>
                    <Link href="#" onClick={() => handleChange("event", "0")}>
                        Login
                    </Link>
                </Stack>
            </Paper>
        </Grid>
    );
};

export default Signup;