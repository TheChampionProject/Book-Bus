import React from "react";
import DateDDI from "./DateDDI";
export default function DateDD({ dates, setDate }) {
    return dates.map((date, id) => {
        return (
            <DateDDI
                key={id}
                date={date}
                setDate={setDate}
            />
        );
    });
}
