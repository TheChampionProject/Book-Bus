import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Grid, Stack, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import form from "../assets/fillable-form.pdf";
import {
  uploadFormFB,
  auth,
  updateUserRequirementsFB,
  getSignedInUserInfoFB,
} from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Verification() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const getUsername = async () => {
      setTimeout(async () => {
        try {
          if (!user && !loading) {
            alert("You must be signed in to view this page");
            window.location.href = "/login";
          }
        } catch {
          alert("You must be signed in to view this page");
          window.location.href = "/login";
        }
      }, 1000);
    };
    getUsername();
  }, []);

  async function handleSubmit() {
    if (videoEnded && selectedFile) {
      try {
        const response = await getSignedInUserInfoFB(user.uid);
        await uploadFormFB(response.name, selectedFile).then(() => {
          alert(
            "Thank you for submitting your forms and watching the video. You will be contacted soon with approval to sign up for an upcoming book bus slot."
          );
          updateUserRequirementsFB(response, true);
          navigate("/home");
        });
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
        <h2>
          First watch the video, then download, sign, and reupload the form
        </h2>
        <h2>
          <b>NOTE:</b> This is much more difficult on mobile, so we recommend using a computer
        </h2>
      </Grid>
      <Grid align="center">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=0W4YQG5LYxk"}
          width={800}
          height={450}
          controls={true}
          onEnded={() => setVideoEnded(true)}
        />
        <Stack width={800} direction="row" justifyContent={"space-between"}>
          <a href={form} download={"VolunteerVerification"}>
            <Button variant="contained" style={{ margin: "40px 0" }}>
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
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Grid>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div />
        <Button
          onClick={() => navigate("/home")}
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
