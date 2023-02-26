import React from "react";
import "../App.css";
import { classNames } from "@hkamran/utility-web";
import { Dropdown, Button } from "react-bootstrap";
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
            <Button
                variant="primary"
                onClick={() => navigate(href)}
                style={{ position: "absolute", top: "20%", left: "1%" }}
            >
                {hrefName}
            </Button>
        );
        rightElement = (
            <input
                type="text"
                placeholder="Search"
                className="SearchBar"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        );

        dropdown = (
            <Dropdown>
                <Dropdown.Toggle
                    variant="primary"
                    style={{
                        position: "absolute",
                        marginTop: ".3em",
                        left: "6%",
                    }}
                >
                    {genreFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu className="ManagePopupDropdownMenu">
                    <GenreDDI setFunction={setGenreFilter} />
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        leftElement = <a href="https://thechampionproject.org/">Our mission</a>;
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
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
                {leftElement}
                {dropdown}
                <h3 className="CPStyleMobile">TCP</h3>
                <h1 className="CPStyleFull" style={{}}>
                    The Champion Project
                </h1>{" "}
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
