import React, { useState }  from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";
import Popup from "../components/Popup.js";

export default function Library() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [show, setShow] = useState(false); // Show the popup
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited

    let handleAddBook = () => {
        setBook(null);
        setShow(true);
    };

   

    return (
        <>
            <div className="container mt-3">
                <Table striped bordered hover>
                    <TableHeader />
                    <tbody>
                        <BookTable
                            setBook={setBook}
                            setShow={setShow}
                            managedBook={managedBook}
                        />
                    </tbody>
                </Table>
                <button
                    type="button"
                    className=" AddBookButton"
                    onClick={handleAddBook}
                >
                    +
                </button>
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
