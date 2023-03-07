import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser, auth, getSignedInUserInfoFB } from "../FirebaseFunctions";
import {
    DialogActions,
    Dialog,
    DialogTitle,
    Stack,
    Button as MUIButton,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import SignUpPopup from "../components/SignUpPopup";

export default function HomePage() {
    const [username, setUsername] = useState("");
    const [fullUserName, setFullUsername] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const getUsername = async () => {
            setTimeout(async () => {
                try {
                    if (!user && !loading) {
                        alert("You must be signed in to view this page");
                        window.location.href = "/login";
                    }
                    const info = await getSignedInUserInfoFB(user.uid);
                    setIsVerified(info.verified);

                    setUsername(info.name.split(" ")[0]);
                    setFullUsername(info.name);
                } catch {
                    alert("You must be signed in to view this page");
                    window.location.href = "/login";
                }
            }, 1000);
        };
        getUsername();
    }, []);

    const handleLogout = async () => {
        try {
            await signOutUser().then(() => {
                navigate("/login");
            });
        } catch (err) {
            alert("Unable to Sign Out!");
        }
    };

    const tryToShowPopup = async (e) => {
        e.preventDefault();
        const info = await getSignedInUserInfoFB(user.uid);

        if (!info.verified) {
            alert("You must be verified before signing up for a date!");
            setShowSignUpPopup(false);
            return;
        } else setShowSignUpPopup(true);
    };

    return (
        <>
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
                <h2 style={{}} className="CPStyleFull">
                    Thank you for volunteering for the Champion Project{" "}
                    {username}!
                </h2>
                <h1 style={{}} className="CPStyleMobile">
                    Hi {username}!
                </h1>

                <Button
                    variant="primary"
                    onClick={handleLogout}
                    style={{ position: "absolute", top: "20%", right: "2%" }}
                >
                    Sign Out
                </Button>
            </div>
            {!isVerified ? (
                <div
                    className="alert alert-danger"
                    role="alert"
                    style={{
                        position: "relative",
                        top: "3.9em",
                        textAlign: "center",
                        display: `${isVerified ? "none" : ""}`,
                    }}
                >
                    <a href="https://ministryopportunities.org/opportunity/76424">
                        You aren't verified! Click here to begin the
                        verification process.
                    </a>
                </div>
            ) : (
                <></>
            )}

            <div
                className="StatsArea"
                style={{ position: "relative", top: "3em" }}
            >
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={() => navigate("/manage")}
                    >
                        Add Books
                    </button>
                    <p className="StatDescription">Add books to the database</p>
                </div>

                <Dialog open={open}>
                    <DialogTitle>
                        Do you Want to Become a Verified Volunteer for The
                        Champion Project?
                    </DialogTitle>
                    <DialogActions>
                        <Stack justifyContent="space-evenly" direction="row">
                            <MUIButton
                                onClick={() => {
                                    localStorage.setItem(
                                        "hideVerifyPopup",
                                        "true"
                                    );

                                    setOpen(false);
                                }}
                                color={"error"}
                            >
                                Skip
                            </MUIButton>
                            <MUIButton
                                onClick={() => {
                                    setOpen(false);
                                }}
                                href="https://ministryopportunities.org/opportunity/76424"
                                color="success"
                            >
                                Sure
                            </MUIButton>
                        </Stack>
                    </DialogActions>
                </Dialog>
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={() => navigate("/gift")}
                    >
                        Gift Books
                    </button>
                    <p className="StatDescription">
                        Give away books at an event
                    </p>
                </div>
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={() => navigate("/stats")}
                    >
                        View Statistics
                    </button>
                    <p className="StatDescription">
                        View statistics about the book database{" "}
                    </p>
                </div>
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={() => navigate("/admin")}
                    >
                        Change Events
                    </button>
                    <p className="StatDescription">
                        Change volunteer event dates and view volunteers
                    </p>
                </div>
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={(e) => {
                            tryToShowPopup(e);
                        }}
                    >
                        Sign Up
                    </button>
                    <p className="StatDescription">
                        Sign up to volunteer at a bookbus event
                    </p>
                </div>
                <div className="Statistic">
                    <button
                        type="button"
                        className="btn btn-primary btn-square-md"
                        onClick={() => navigate("/verifylist")}
                    >
                        Verify
                    </button>
                    <p className="StatDescription">
                        Verify volunteers for bookbus events
                    </p>
                </div>
            </div>

            <SignUpPopup
                showSignUpPopup={showSignUpPopup}
                setShowSignUpPopup={setShowSignUpPopup}
                fullUserName={fullUserName}
            />
        </>
    );
}
