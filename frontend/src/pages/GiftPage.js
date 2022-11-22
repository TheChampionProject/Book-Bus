import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import GiftConfirmation from "../components/GiftConfirmation.js";
import Table from "react-bootstrap/Table";
import "../App.css";

export default function ManagePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");
    const [showGC, setShowGC] = useState(false);
    const [book, setBook] = useState(null);

    return (
        <>
            <div className="fixed-top navbar NavHead">
                <a href="/manage">Go to the Manage Page</a>
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
            <div
                className={`fixed-top alert alert-${
                    alert.success ? "success" : "danger"
                }`}
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
                            <TableHeader mode={"gift"} className="fixed-top" />
                            <tbody>
                                <BookTable
                                    managedBook={managedBook}
                                    setManagedBook={setManagedBook}
                                    setBook={setBook}
                                    setAlert={setAlert}
                                    searchQuery={searchQuery}
                                    mode={"gift"}
                                    setShowGC={setShowGC}
                                />
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <GiftConfirmation
                showGC={showGC}
                setShowGC={setShowGC}
                book={book}
                setManagedBook={setManagedBook}
            />
        </>
    );
}
