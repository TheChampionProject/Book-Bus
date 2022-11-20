import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import EditPopup from "../components/EditPopup.js";
import AddPopup from "../components/AddPopup.js";

export default function ManagePage() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [showEditPoup, setShowEditPopup] = useState(false); // Show the popup
    const [showAddPopup, setShowAddPopup] = useState(false); // Show the popup
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");

    let handleAddBook = (e) => {
        e.preventDefault();
        setShowAddPopup(true);
    };

    return (
        <>
            <div className="fixed-top navbar NavHead">
                <a href="/gift">Go to Gift Page</a>

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
                        <TableHeader mode={"manage"} />

                        <tbody>
                            <BookTable
                                setBook={setBook}
                                setShowEditPopup={setShowEditPopup}
                                managedBook={managedBook}
                                setManagedBook={setManagedBook}
                                setAlert={setAlert}
                                searchQuery={searchQuery}
                                mode={"manage"}
                            />
                        </tbody>
                    </Table>
                </div>
                <button
                    type="button"
                    className="AddBookButton"
                    onClick={(e) => handleAddBook(e)}
                >
                    +
                </button>
            </div>

            <EditPopup
                showEditPopup={showEditPoup}
                setShowEditPopup={setShowEditPopup}
                book={book}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
            />

            <AddPopup
                showAddPopup={showAddPopup}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setAlert={setAlert}
                setShowEditPopup={setShowEditPopup}
            />
        </>
    );
}
