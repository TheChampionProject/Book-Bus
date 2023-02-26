import React from "react";
import BookStats from "../components/BookStats.js";
export default function StatsPage() {
    return (
        <>
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
                {" "}
                <h1 style={{ fontSize: "2rem" }} className="CPStyleFull">
                    
                </h1>
            </div>
            <div className="statsNav">
                <span className="navItem" />
                <h3 className="GiftHeader">The Champion Project</h3>
                <span className="navItem" />
            </div>

            <BookStats />
        </>
    );
}
