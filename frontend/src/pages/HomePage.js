import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import VolunteerDates from "../components/VolunteerDates";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const [selectedDateIDs, setSelectedDateIDs] = useState([]);
    const [unselectedDateIDs, setUnselectedDateIDs] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [username, setUsername] = useState("");
    const [fullUserName, setFullUsername] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getUsername = async () => {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + "getSignedInUserName"
            );
            if (response.data === "No user signed in") {
                alert("You must be signed in to view this page");
                window.location = "/login";
            }
            setUsername(response.data.split(" ")[0]);
            setFullUsername(response.data);
        };
        getUsername();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "getSignedInUserInfo"
        );



        if (!response.data.watchedVideo || !response.data.uploadedForm) {
            alert(
                "You must watch the video and upload the form before signing up for a date!"
            );
            return;
        }

        let request = "Error";
        try {
            request = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "signUpForDate",
                {
                    dateIDs: selectedDateIDs,
                    unselectedDateIDs: unselectedDateIDs,
                }
            );
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
            alert("Your date changes have been saved! Please refresh the page to ensure the changes are correct.");
    };

    const handleLogout = async () => {
        try {
            await axios
                .post(process.env.REACT_APP_BACKEND_URL + "logout")
                .then(() => {
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
                <Button variant="primary" href="/manage">
                    Manage the book database
                </Button>
                <br />
                <br />
                <Button variant="primary" href="/gift">
                    Gift books
                </Button>
                <br />
                <br />
                <Button variant="primary" href="/stats">
                    View statistics
                </Button>

                <br />
                <br />
                <Button variant="primary" href="/admin">
                    Admin Page
                </Button>
                <br />
                <br />
                <h2>Or sign up to volunteer: </h2>
                <h5>Available Dates (If you're on mobile, you may need to press aA, Request Desktop Site):</h5>
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
            </div>
        </>
    );
}
