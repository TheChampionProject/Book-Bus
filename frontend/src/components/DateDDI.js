import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
export default function DateDDI({ date, setDate }) {
    return (
        <Dropdown.Item onClick={() => setDate(date)}>
            {new Date(date.startDate).toDateString()} from{" "}
            {new Date(date.startDate).getHours() > 12
                ? new Date(date.startDate).getHours() - 12 + "pm"
                : new Date(date.startDate).getHours() + "am"}{" "}
            to{" "}
            {new Date(date.endDate).getHours() > 12
                ? new Date(date.endDate).getHours() - 12 + "pm"
                : new Date(date.endDate).getHours() + "am"}{" "}
            at {date.location}
        </Dropdown.Item>
    );
}
