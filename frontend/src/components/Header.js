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
    const navigate = useNavigate();

    return (
        <>
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
                <div
                    style={{
                        display: "flex",
                        marginLeft: "1em",
                        marginTop: ".5em",
                    }}
                >
                    <Button
                        variant="primary"
                        onClick={() => navigate(href)}
                        style={{}}
                    >
                        {hrefName}
                    </Button>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="primary"
                            style={{ marginLeft: "1em" }}
                        >
                            {genreFilter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ManagePopupDropdownMenu">
                            <GenreDDI setFunction={setGenreFilter} />
                        </Dropdown.Menu>
                    </Dropdown>{" "}
                </div>
                <h3 className="CPStyleMobile">TCP</h3>
                <h2 className="CPStyleFull" style={{ marginTop: "-1.1em" }}>
                    The Champion Project
                </h2>
                <input
                    type="text"
                    placeholder="Search"
                    className="SearchBar"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
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
