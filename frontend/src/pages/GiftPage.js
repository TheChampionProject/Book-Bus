import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import Popup from "../components/Popup.js";

export default function GiftPage() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [show, setShow] = useState(false); // Show the popup
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [archiveRequest, setArchiveRequest] = useState({
        needsArchive: false,
        book: managedBook,
    });
    const [alert, setAlert] = useState({ show: false, message: "" }); // Show the alert

    let handleAddBook = (e) => {
        e.preventDefault();
        setBook(null);
        setShow(true);
    };

    return (
        <>
            <div
                className="fixed-top alert alert-danger"
                style={{ display: alert.show ? "" : "none" }}
            >
                There was a problem connecting to the database. {alert.message}
                Please refresh the page.
            </div>
            <div className={Table}>
                <div className="container mt-3">
                    <Table striped bordered hover>
                        <TableHeader />
                        <tbody>
                            <BookTable
                                setBook={setBook}
                                setShow={setShow}
                                managedBook={managedBook}
                                setManagedBook={setManagedBook}
                                setAlert={setAlert}
                                setArchiveRequest={setArchiveRequest}
                                archiveRequest={archiveRequest}
                            />
                        </tbody>
                    </Table>
                    <button
                        type="button"
                        className=" AddBookButton"
                        onClick={(e) => handleAddBook(e)}
                    >
                        +
                    </button>
                </div>
            </div>

            <Popup
                show={show}
                setShow={setShow}
                book={book}
                setManagedBook={setManagedBook}
                setArchiveRequest={setArchiveRequest}
                archiveRequest={archiveRequest}
            />
        </>
    );
}
