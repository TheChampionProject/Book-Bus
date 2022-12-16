import React from "react";
import "../App.css";
import { classNames } from "@hkamran/utility-web";

export default function Header({setSearchQuery, alert, href, hrefName}) {
    return (
        <>
            <div className="fixed-top navbar NavHead">
                <a href={href}>{hrefName}</a>
                <h3 className="CPStyle" style={{ textAlign: "center" }}>
                    The Champion Project
                </h3>
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="SearchBar"
                        style={{ margin: "1em" }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
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
