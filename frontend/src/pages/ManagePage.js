import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import EditPopup from "../components/EditPopup.js";
import AddPopup from "../components/AddPopup.js";
import { classNames } from "@hkamran/utility-web";

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
    let [books, setBooks] = useState("null");

    let handleAddBook = (e) => {
        e.preventDefault();
        setShowAddPopup(true);
    };

    return (
        <>
            <div className="fixed-top navbar NavHead">
                <a href="/gift">Go to Gift Page</a>
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
                                mode={"manage"}
                                className="fixed-top"
                            />
                            <tbody>
                                <BookTable
                                    setBook={setBook}
                                    setShowEditPopup={setShowEditPopup}
                                    managedBook={managedBook}
                                    setManagedBook={setManagedBook}
                                    setAlert={setAlert}
                                    searchQuery={searchQuery}
                                    mode={"manage"}
                                    books={books}
                                    setBooks={setBooks}
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
            </div>

            <EditPopup
                showEditPopup={showEditPoup}
                setShowEditPopup={setShowEditPopup}
                book={book}
                setBook={setBook}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
            />

            <AddPopup
                showAddPopup={showAddPopup}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setAlert={setAlert}
                setShowEditPopup={setShowEditPopup}
                books={books}
            />
        </>
    );
}
