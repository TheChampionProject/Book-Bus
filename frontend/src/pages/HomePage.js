import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import VolunteerDates from "../components/VolunteerDates";

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [dates, setDates] = useState([]);
    let startDates = [];

    const selectDate = (e) => {
        e.preventDefault();
        setSelectedDate(e.target.value);

        for (let i = 0; i < dates.length; i++) {
            startDates.push(dates[i].startDate.slice(0, 10));
        }

        if (!startDates.includes(selectedDate) && startDates.length > 0) {
            alert("Please select an available date");
        }
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
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                        selectDate(e);
                    }}
                />
            </div>
        </>
    );
}
