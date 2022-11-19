import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import Popup from "../components/Popup.js";

export default function ManagePage() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [show, setShow] = useState(false); // Show the popup
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
                <a href="/manage">Go to Manage Page</a>

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

            <div className={"BookTable"}>
                <div className="container mt-3">
                    <Table striped bordered hover>
                        <TableHeader mode={"gift"} />

                        <tbody>
                            <BookTable
                                setBook={setBook}
                                setShow={setShow}
                                managedBook={managedBook}
                                setManagedBook={setManagedBook}
                                setAlert={setAlert}
                                searchQuery={searchQuery}
                                mode={"gift"}
                            />
                        </tbody>
                    </Table>
                </div>
            </div>

            <Popup
                show={show}
                setShow={setShow}
                book={book}
                setManagedBook={setManagedBook}
            />
        </>
    );
}
