import React from "react";
import "../App.css";
import { classNames } from "@hkamran/utility-web";

export default function Header({
    setSearchQuery,
    alert,
    href,
    hrefName,
    useSearchBar,
}) {
    let leftElement, rightElement;
    if (useSearchBar) {
        leftElement = <a href={href}>{hrefName}</a>;
        rightElement = (
            <input
                type="text"
                placeholder="Search"
                className="SearchBar"
                style={{ margin: "1em" }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        );
    } else {
        leftElement = <a href={"https://thechampionproject.org/"}>Our mission</a>;
        rightElement = <a href={"/login"} style={{position: "absolute", top: ".5em", right: "1em"}}>Sign in/up</a>
    }
    return (
        <>
            <div className="fixed-top navbar NavHead">
                {leftElement}
                <h3 className="CPStyle">The Champion Project</h3>
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
