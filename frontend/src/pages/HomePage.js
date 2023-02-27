import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import VolunteerDates from "../components/VolunteerDates";
import { useNavigate } from "react-router-dom";
import UserProtection from "../components/UserProtection";
import {
    signOutUser,
    changeDateFB,
    auth,
    getSignedInUserInfoFB,
} from "../FirebaseFunctions";
import {
    DialogActions,
    Dialog,
    DialogTitle,
    Stack,
    Button as MUIButton,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

export default function HomePage() {
    const [selectedDateIDs, setSelectedDateIDs] = useState([]);
    const [unselectedDateIDs, setUnselectedDateIDs] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [username, setUsername] = useState("");
    const [fullUserName, setFullUsername] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        const getUsername = async () => {
            try {
                if (!user && !loading) {
                    alert("You must be signed in to view this page");
                    window.location.href = "/login";
                }
                const info = await getSignedInUserInfoFB(user.uid);

                setUsername(info.name.split(" ")[0]);
                setFullUsername(info.name);
            } catch {
                alert("You must be signed in to view this page");
                window.location.href = "/login";
            }
        };
        getUsername();

        const checkVerification = async() => {
            const info = await getSignedInUserInfoFB(user.uid);
            if (!info['verified']) {
                setOpen(true);
            }
        }
        checkVerification();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const response = await getSignedInUserInfoFB();

        if (!response.watchedVideo || !response.uploadedForm) {
            alert(
                "You must watch the video and upload the form before signing up for a date!"
            );
            return;
        }

        let request = "Error";
        try {
            request = await changeDateFB(selectedDateIDs, unselectedDateIDs);
        } catch {
            alert("There was an error with your request");
        }

        if (request.data === "User already Signed Up")
            alert("You are already signed up for this date");
        else if (request.data === "No date found with that ID.")
            alert("There was an error with your request");
        else if (request.data === "No user signed in")
            alert("You must be signed in to sign up for a date");
        else if (request.data === "success")
            alert(
                "Your date changes have been saved! Please refresh the page to ensure the changes are correct."
            );
    };

    const handleLogout = async () => {
        try {
            await signOutUser().then(() => {
                navigate("/login");
            });
        } catch (err) {
            alert("Unable to Sign Out!");
        }
    };

    return (
        <>
            <div className="CenterHomePage">
                <div className="HomePageHeader">
                    <h1>
                        Thank you for volunteering for the Champion Project{" "}
                        {username}!
                    </h1>
                    <Button
                        variant="primary"
                        onClick={handleLogout}
                        style={{ position: "absolute", top: "1%", right: "2%" }}
                    >
                        Sign Out
                    </Button>
                </div>

                <br />
                <h2>Chose a page to go to: </h2>
                <Button variant="primary" onClick={() => navigate("/manage")}>
                    Manage the book database
                </Button>
                <br />
                <br />
                <Button variant="primary" onClick={() => navigate("/gift")}>
                    Gift books
                </Button>
                <br />
                <br />
                <Button variant="primary" href="/stats">
                    View statistics
                </Button>

                <br />
                <br />
                <Button variant="primary" onClick={() => navigate("/admin")}>
                    Change Event Dates
                </Button>
                <br />
                <br />
                <h2>Or sign up to volunteer: </h2>
                <h5>Available Dates:</h5>
                <VolunteerDates
                    availableDates={availableDates}
                    setAvailableDates={setAvailableDates}
                    setSelectedDateIDs={setSelectedDateIDs}
                    selectedDateIDs={selectedDateIDs}
                    fullUserName={fullUserName}
                    setUnselectedDateIDs={setUnselectedDateIDs}
                    unselectedDateIDs={unselectedDateIDs}
                />
                <br />

                <Button variant="primary" onClick={submit} className="">
                    Save Changes
                </Button>
                <Dialog open={open}>
                    <DialogTitle>Do you Want to Become a Verified Volunteer for The Champion Project?</DialogTitle>
                    <DialogActions>
                        <Stack justifyContent="space-evenly" direction="row">
                            <MUIButton
                                onClick={() => {
                                    setOpen(false);
                                }}
                                color={"error"}
                            >
                                Skip
                            </MUIButton>
                            <MUIButton 
                                onClick={() => {setOpen(false)}} 
                                href="https://ministryopportunities.org/opportunity/76424" 
                                color="success"
                            >
                                Sure
                            </MUIButton>
                        </Stack>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
