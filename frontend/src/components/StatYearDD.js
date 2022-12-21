import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
export default function StatYearDD({ setStatsYear }) {
    let dropDownItems = [];
    for (let i = 2022; i < 2032; i++) {
        dropDownItems.push(
            <Dropdown.Item key={i} onClick={() => setStatsYear(i)}>
                {i}
            </Dropdown.Item>
        );
    }

    return dropDownItems;
}
