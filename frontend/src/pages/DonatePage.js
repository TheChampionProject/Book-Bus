import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import { classNames } from "@hkamran/utility-web";

export default function DonatePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="fixed-top navbar NavHead">
                <a href="https://thechampionproject.org/">Go to Our Website</a>

                <h3 className="CPStyle">The Champion Project</h3>

                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        style={{ margin: "1em" }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <em className="Center">
                    Please send books to the Junior League Office at 8686 New
                    Trails Dr, The Woodlands, TX 77381
                </em>
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
            <div className="BookTableParent">
                <div className="BookTable">
                    <div className="container mt-3">
                        <Table
                            striped
                            bordered
                            hover
                            className="ActualBookTable"
                        >
                            <TableHeader
                                mode={"donate"}
                                className="fixed-top"
                            />
                            <tbody>
                                <BookTable
                                    managedBook={managedBook}
                                    setManagedBook={setManagedBook}
                                    setAlert={setAlert}
                                    searchQuery={searchQuery}
                                    mode={"donate"}
                                />
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}