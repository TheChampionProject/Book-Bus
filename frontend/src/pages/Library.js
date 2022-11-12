import React, { useState } from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import Popup from "../components/Popup.js";

export default function Library() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [show, setShow] = useState(false); // Show the popup
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState(false);

    let handleAddBook = (e) => {
        e.preventDefault();
        setBook(null);
        setShow(true);
    };

    return (
        <>
            <div
                className="alert alert-danger Alert"
                role="alert"
                style={{
                    display: true ? "show" : "none",
                    
                }}
            >
                Connection to database failed!
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
            />
        </>
    );
}
