import { useEffect } from "react";
import React from "react";
export default function VolunteerDates({ dates, setDates }) {
    useEffect(() => {
        const getDates = async () => {
            let dates = [];

            await fetch(process.env.REACT_APP_BACKEND_URL + "getDates")
                .then((response) => response.json())
                .then((data) => {
                    for (let i in data[0]) dates.push(data[0][i]);
                    setDates(dates);
                });
        };
        getDates();
    }, []);

    if (dates === "") return <div>Loading...</div>;
    else
        return dates.map((date, number) => (
            <div key={number}>
                {new Date(date.startDate).toDateString()} at{" "}
                {new Date(date.startDate).getHours() > 12
                    ? new Date(date.startDate).getHours() - 12 + "pm"
                    : new Date(date.startDate).getHours()}{" "}
                at {date.location} to{" "}
                {new Date(date.endDate).getHours() > 12
                    ? new Date(date.endDate).getHours() - 12 + "pm"
                    : new Date(date.endDate).getHours()}
            </div>
        ));
}
