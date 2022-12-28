import { useEffect } from "react";
import React from "react";
export default function VolunteerDates({
    availableDates,
    setAvailableDates,
    setSelectedDateIDs,
    selectedDateIDs,
    fullUserName,
    setUnselectedDateIDs,
    unselectedDateIDs,
}) {
    useEffect(() => {
        const getDates = async () => {
            let availableDates = [];

            await fetch(process.env.REACT_APP_BACKEND_URL + "getDates")
                .then((response) => response.json())
                .then((data) => {
                    for (let i in data[0]) availableDates.push(data[0][i]);
                    setAvailableDates(availableDates);
                });

            const currentDate = new Date();
            availableDates = availableDates.filter((date) => {
                return (
                    currentDate.getTime() <= new Date(date.startDate).getTime()
                );
            });

            for (let i = 0; i < availableDates.length; i++) {
                if (!availableDates[i].volunteers) {
                    availableDates[i].volunteers = [];
                }
            }

            setAvailableDates(availableDates);
        };
        getDates();
    }, []);

    const tryToSelectDate = (date, checked) => {
        if (checked) {
            selectedDateIDs.push(date.id);
            setSelectedDateIDs(selectedDateIDs);
        } else {
            for (let i = 0; i < selectedDateIDs.length; i++) {
                if (selectedDateIDs[i] === date.id) {
                    selectedDateIDs.splice(i, 1);
                    break;
                }
            }

            if (
                date.volunteers.includes(fullUserName) &&
                !unselectedDateIDs.includes(date.id)
            ) {
                unselectedDateIDs.push(date.id);
                setUnselectedDateIDs(unselectedDateIDs);
            }
        }
    };

    // It's hacky but it works
    if (fullUserName === null) {
        setTimeout(() => {}, 200);
    } else
        return availableDates.map((date, number) => (
            <div key={number} className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={date.volunteers.includes(fullUserName)}
                    onChange={(e) => tryToSelectDate(date, e.target.checked)}
                ></input>
                {new Date(date.startDate).toDateString()} from{" "}
                {new Date(date.startDate).getHours() > 12
                    ? new Date(date.startDate).getHours() - 12 + "pm "
                    : new Date(date.startDate).getHours() + "am "}
                to{" "}
                {new Date(date.endDate).getHours() > 12
                    ? new Date(date.endDate).getHours() - 12 + "pm "
                    : new Date(date.endDate).getHours() + "am "}
                at {date.location}
            </div>
        ));
}
