import Button from "react-bootstrap/Button";
import React, { useState, useRef, useEffect } from "react";
import VolunteerDates from "../components/VolunteerDates";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState("");
    let [dates, setDates] = useState([]);
    let [username, setUsername] = useState("");
    let startDates = [],
        dateIDs = [],
        selectedDateID,
        okayToProceed = false;

    let dateField = useRef();
    let navigate = useNavigate();

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
        };
        getUsername();
    }, []);

    const tryToSelectStartDate = async (newDate) => {
        for (let i = 0; i < dates.length; i++) {
            startDates.push(dates[i].startDate.slice(0, 10));
            dateIDs.push(dates[i].id);
        }

        let dateIndex = startDates.indexOf(newDate);
        if (
            (!startDates.includes(newDate) && newDate !== "") ||
            dateIndex === -1
        ) {
            alert("Please select an available date");
            setSelectedDate("");
        } else {
            okayToProceed = true;
            selectedDateID = dateIDs[dateIndex];
            setSelectedDate(newDate);
        }
    };

    const submit = async (e) => {
        tryToSelectStartDate(dateField.current.value);
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
            if (okayToProceed) {
                request = await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "signUpForDate",
                    {
                        dateID: selectedDateID,
                    }
                );
            } else alert("There was an error with your request");
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
            alert("You have successfully signed up for this date!");
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
                <h5>Available Dates:</h5>
                <VolunteerDates dates={dates} setDates={setDates} />
                <br />
                <h4>Select a date:</h4>
                <input
                    type="date"
                    value={selectedDate}
                    ref={dateField}
                    onChange={(e) => {
                        tryToSelectStartDate(e.target.value);
                    }}
                />
                <Button
                    variant="primary"
                    onClick={submit}
                    className="DateSubmitButton"
                >
                    Submit
                </Button>
            </div>
        </>
    );
}
