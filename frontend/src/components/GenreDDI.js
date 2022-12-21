import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
export default function GenreDDI({ setFunction }) {
    return (
        <>
            <Dropdown.Item onClick={() => setFunction("Explore: Fantasy")}>
                Explore: Fantasy
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Explore: Sports")}>
                Explore: Sports
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Explore")}>
                Explore
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Laugh: Graphic Novel")}>
                Laugh: Graphic Novel
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Laugh")}>
                Laugh
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Be Inspired: People")}>
                Be Inspired: People
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Be Inspired: Event")}>
                Be Inspired: Event
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Be Inspired")}>
                Be Inspired
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Solve It: Activity")}>
                Solve It: Activity
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFunction("Solve It")}>
                Solve It
            </Dropdown.Item>
        </>
    );
}
