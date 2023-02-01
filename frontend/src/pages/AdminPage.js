import React, { useState, useEffect, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DateDD from "../components/DateDD";
import axios from "axios";
import Button from "react-bootstrap/Button";
import uuidv4 from "uuid";
import { useNavigate } from "react-router-dom";
import { getSignedInUserInfoFB } from "../FirebaseFunctions";

export default function AdminPage() {
    const [signedUpDateQuery, setSignedUpDateQuery] = useState("");
    const [dateToBeChanged, setDateToBeChanged] = useState({
        startDate: "Select a date to change",
    });
    const [newDate, setNewDate] = useState("");
    const [newEndTime, setNewEndTime] = useState("");

    const [newTime, setNewTime] = useState("");
    const [newLocation, setNewLocation] = useState("");

    let dateField = useRef();
    const [dates, setDates] = useState([]);

    let [addDateMode, setDateMode] = useState(false);


    let navigate = useNavigate();


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


    useEffect(() => {
        const getUsername = async () => {
            const response = await getSignedInUserInfoFB();

            if (response === "No user signed in") {
                alert("You must be signed in to view this page");
                navigate("/login");
            }
            if (!response.admin) {
                alert("You must be an admin to view this page");
                navigate("/home");
            }
        };
        getUsername();
    }, []);


    const addDate = (e) => {
        e.preventDefault();
        setDateMode(true);
        const newDate = {};
        newDate.id = uuidv4();
        setDateToBeChanged(newDate);
    };

    const submit = async () => {
        if (addDateMode) {

            if (
                newDate === "" ||
                newTime === "" ||
                newLocation === "" ||
                newEndTime === ""
            ) {

                alert("Please fill out all fields");
                return;
            }
        }
        let startDate = newDate,
            location = newLocation,

            time = newTime,
            endTime = newEndTime;

        if (newDate === "") startDate = dateToBeChanged.startDate.slice(0, 10);
        if (newTime === "") time = dateToBeChanged.startDate.slice(11, 16);
        if (newLocation === "") location = dateToBeChanged.location;
        if (newEndTime === "") endTime = dateToBeChanged.endDate.slice(11, 16);

        const newData = {
            startDate: startDate + " " + time,
            location: location,
            id: dateToBeChanged.id,
            endDate: startDate + " " + endTime,
            volunteers: dateToBeChanged.startDate === "Select a date to change"? dateToBeChanged.volunteers : [""],
        };
        const request = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "changeDate",
            {
                newData,
            }
        );
        if (request.data === "Error")
            alert("There was an error with your request");

        else
            alert(
                "Date changed successfully. Refresh the page to see changes."
            );
    };

    let signedUpDateQueryVolunteers = [];

    if (signedUpDateQuery !== "") {
        for (let i in signedUpDateQuery.volunteers) {
            signedUpDateQueryVolunteers.push(signedUpDateQuery.volunteers[i]);
            if (signedUpDateQueryVolunteers[i] !== "")
                signedUpDateQueryVolunteers.push(", ");

            if (signedUpDateQueryVolunteers[i] === "") {
                signedUpDateQueryVolunteers.pop();
                signedUpDateQueryVolunteers.pop();
            }

            if (signedUpDateQueryVolunteers[i] === null) {
                signedUpDateQueryVolunteers.pop();
            }
        }

        if (
            signedUpDateQueryVolunteers[
                signedUpDateQueryVolunteers.length - 1
            ] === ", "
        )
            signedUpDateQueryVolunteers.pop();

        if (signedUpDateQueryVolunteers.length === 0)
            signedUpDateQueryVolunteers.push("No volunteers signed up :(");
    }


    return (
        <>
            <div className="CenterAdminPage">
                <h1>Admin Page</h1>

                <a
                    href="/home"
                    style={{ position: "absolute", top: "1em", left: "1em" }}
                >
                    Home Page
                </a>

                <br />
                <h4>Change/Add A BookBus Event Date:</h4>
                <div style={{ display: "flex", justifyContent: "normal" }}>
                    <Button
                        style={{ marginRight: "2em" }}
                        onClick={(e) => addDate(e)}
                    >

                        Add

                    </Button>

                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            {dateToBeChanged.startDate}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <DateDD
                                dates={dates}
                                setDate={setDateToBeChanged}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div
                    className={`${
                        dateToBeChanged.startDate === "Select a date to change"
                            ? "Hidden"
                            : ""
                    }`}
                >
                    <br />
                    <h4>Change The Start Time (24 Hr): {newTime}</h4>
                    <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                    ></input>
                    <br />

                    <br />
                    <h4>Change The End Time (24 Hr): {newEndTime}</h4>
                    <input
                        type="time"
                        value={newEndTime}
                        onChange={(e) => setNewEndTime(e.target.value)}
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

                <br />
                {signedUpDateQueryVolunteers}

            </div>
        </>
    );
}
