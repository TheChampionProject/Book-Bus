import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Grid, Stack, Button, Toolbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VolunteerVerification from "../assets/Completion-Confirmation-book-bus.pdf";
import { verify } from "../FirebaseFunctions";

export default function VolunteerVerify() {
    const [videoEnded, setVideoEnded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    var bodyFormData = new FormData();
    let navigate = useNavigate();

    async function handleSubmit() {
        if (videoEnded && selectedFile) {
            bodyFormData.append("verificationFile", selectedFile);
            try {
                await verify();
                navigate("/home");
            } catch (err) {
                console.log(err);
            }
        } else {
            alert(
                "Please watch the entire video and upload a completed form before registering!"
            );
        }
    }

    return (
        <>
            <Grid align="center" padding={5}>
                <h2>Book Bus Volunteer Verification Requirements</h2>
            </Grid>
            <Grid align="center">
                <ReactPlayer
                    url={"https://youtu.be/XdWwTmmMmPc"}
                    width={800}
                    height={450}
                    controls={true}
                    onEnded={() => setVideoEnded(true)}
                />
                <Stack
                    width={800}
                    direction="row"
                    justifyContent={"space-between"}
                >
                    <a
                        href={VolunteerVerification}
                        download={"VolunteerVerification"}
                    >
                        <Button
                            variant="contained"
                            style={{ margin: "40px 0" }}
                        >
                            Download Verification Form
                        </Button>
                    </a>
                    <Button
                        style={{ margin: "40px 0" }}
                        variant="contained"
                        component="label"
                    >
                        Upload Completed Form
                        <input
                            hidden
                            accept=".pdf"
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-evenly">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </Grid>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <div />
                <Button
                    href="/home"
                    sx={{ borderRadius: 20, height: 65 }}
                    variant="outlined"
                    color="error"
                >
                    Skip
                </Button>
            </Toolbar>
        </>
    );
}
