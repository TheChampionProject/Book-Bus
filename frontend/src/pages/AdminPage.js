import React, { useState, useEffect, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DateDD from "../components/DateDD";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function AdminPage() {
    const [signedUpDateQuery, setSignedUpDateQuery] = useState("");
    const [dateToBeChanged, setDateToBeChanged] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newLocation, setNewLocation] = useState("");

    let dateField = useRef();
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const getDates = async () => {
            await fetch(process.env.REACT_APP_BACKEND_URL + "getDates")
                .then((response) => response.json())
                .then((data) => {
                    for (let i in data[0]) dates.push(data[0][i]);
                    setDates(dates);
                });
        };
        getDates();
    }, []);

    const submit = async () => {
        let startDate = newDate,
            location = newLocation,
            time = newTime;
        if (newDate === "") startDate = dateToBeChanged.startDate.slice(0, 10);
        if (newTime === "") time = dateToBeChanged.startDate.slice(11, 16);
        if (newLocation === "") location = dateToBeChanged.location;

        const newData = {
            startDate: startDate + " " + time,
            location: location,
            id: dateToBeChanged.id,
            endDate: dateToBeChanged.endDate,
            volunteers: dateToBeChanged.volunteers,
        };
        const request = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "changeDate",
            {
                newData,
            }
        );
        if (request.data === "Error")
            alert("There was an error with your request");
        else alert("Date changed successfully");
    };

    return (
        <>
            <div className="CenterAdminPage">
                <h1>Admin Page</h1>
                <br />
                <h4>Change A BookBus Event Date:</h4>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" className="">
                        {dateToBeChanged.startDate}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <DateDD dates={dates} setDate={setDateToBeChanged} />
                    </Dropdown.Menu>
                </Dropdown>
                <div className={`${dateToBeChanged === "" ? "Hidden" : ""}`}>
                    <br />
                    <h4>Change The Time (24 Hr): {newTime}</h4>
                    <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                    ></input>
                    <br />

                    <h4>Change The Date: {newDate}</h4>
                    <input
                        type="date"
                        value={newDate}
                        ref={dateField}
                        onChange={(e) => {
                            setNewDate(e.target.value);
                        }}
                    />
                    <br />

                    <h4
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                    >
                        Change The Location: {newLocation}
                    </h4>
                    <input
                        type="text"
                        onChange={(e) => setNewLocation(e.target.value)}
                    ></input>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            submit();
                            e.preventDefault();
                        }}
                        className="DateSubmitButton"
                    >
                        Submit
                    </Button>
                </div>
                <br />
                <h4>Or View Volunteers Signed Up For An Event:</h4>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        {signedUpDateQuery.startDate}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <DateDD dates={dates} setDate={setSignedUpDateQuery} />
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}
