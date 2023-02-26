import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import VolunteerDates from "../components/VolunteerDates";
import { useNavigate } from "react-router-dom";
import {
    signOutUser,
    changeDateFB,
    auth,
    getSignedInUserInfoFB,
} from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";

export default function HomePage() {
    const [selectedDateIDs, setSelectedDateIDs] = useState([]);
    const [unselectedDateIDs, setUnselectedDateIDs] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [username, setUsername] = useState("");
    const [fullUserName, setFullUsername] = useState(null);
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
            alert("Your date changes have been saved!");
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
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
                <h1 style={{}} className="CPStyleFull">
                    Thank you for volunteering for the Champion Project{" "}
                    {username}!
                </h1>
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

            <div
                className="StatsArea"
                style={{ position: "relative", top: "5em" }}
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
            </div>
        </>
    );
}
