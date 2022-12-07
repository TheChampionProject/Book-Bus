import Button from "react-bootstrap/Button";
import React, { useState, useRef } from "react";
import VolunteerDates from "../components/VolunteerDates";
import axios from "axios";

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [dates, setDates] = useState([]);
    let startDates = [],
        dateIDs = [],
        selectedDateID,
        okayToProceed = false;

    let dateField = useRef();

    const tryToSelectStartDate = (newDate) => {
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
        if (okayToProceed) {
            await axios.post(
                process.env.REACT_APP_BACKEND_URL + "signUpForDate",
                {
                    dateID: selectedDateID,
                }
            );
        } else alert("There was an error with your request");
    };
    return (
        <>
            <div className="CenterHomePage">
                <h1>Thank you for volunteering for the Champion Project!</h1>
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