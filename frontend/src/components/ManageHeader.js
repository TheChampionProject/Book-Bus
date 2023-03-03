import React from "react";
import "../App.css";
import { classNames } from "@hkamran/utility-web";
import { Dropdown, Button } from "react-bootstrap";
import GenreDDI from "./GenreDDI";
import { useNavigate } from "react-router-dom";

export default function ManageHeader({
    setSearchQuery,
    alert,
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
                        onClick={() => navigate("/home")}
                        style={{}}
                        className=""
                    >
                        Home
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

                <h2 className="CPStyleFull" style={{ marginTop: "-1.4em" }}>
                    The Champion Project
                </h2>
                <input
                    type="text"
                    placeholder="Search"
                    className="SearchBarFull"
                    style={{ position: "absolute", right: "1em", top: "1em" }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="SearchBarMobile"
                    style={{
                        width: "7em",
                        position: "absolute",
                        top: "1em",
                        right: "1em",
                    }}
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
