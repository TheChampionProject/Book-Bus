import React from "react";
import "../App.css";
import { classNames } from "@hkamran/utility-web";
import Dropdown from "react-bootstrap/Dropdown";
import GenreDDI from "./GenreDDI";
import { useNavigate } from "react-router-dom";

export default function Header({
    setSearchQuery,
    alert,
    href,
    hrefName,
    useSearchBar,
    setGenreFilter,
    genreFilter,
}) {
    let leftElement, rightElement, dropdown;
    const navigate = useNavigate();

    if (useSearchBar) {
        leftElement = (
            <a
                onClick={() => {
                    navigate(href);
                }}
                className="Link"
            >
                {hrefName}
            </a>
        );
        rightElement = (
            <input
                type="text"
                placeholder="Search"
                className="SearchBar"
                style={{ margin: "1em" }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        );

        dropdown = (
            <Dropdown>
                <Dropdown.Toggle variant="primary" className="GenreFilter">
                    {genreFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu className="ManagePopupDropdownMenu">
                    <GenreDDI setFunction={setGenreFilter} />
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        leftElement = (
            <a href = "https://thechampionproject.org/">
                Our mission
            </a>
        );
        rightElement = (
            <a
                onClick={() => navigate("/login")}
                style={{ position: "absolute", top: ".5em", right: "1em" }}
                className="Link"
            >
                Sign in/up
            </a>
        );
        dropdown = <></>;
    }
    return (
        <>
            <div className="fixed-top navbar NavHead">
                {leftElement}
                {dropdown}
                <h3 className="CPStyleMobile">TCP</h3>
                <h3 className="CPStyleFull">The Champion Project</h3>{" "}
                {rightElement}
            </div>

            <div
                className={classNames(
                    "fixed-top alert",
                    alert.success ? "alert-success" : "alert-danger"
                )}
                style={{ display: alert.show ? "" : "none" }}
            >
                {alert.message}
            </div>
        </>
    );
}
