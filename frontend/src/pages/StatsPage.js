import React from "react";
import BookStats from "../components/BookStats.js";
export default function StatsPage() {
    return (
        <>
            <div className="statsNav">
                <span className="navItem" />
                <h3 className="CPStyle">The Champion Project</h3>
                <span className="navItem" />
            </div>

            <BookStats />
        </>
    );
}
