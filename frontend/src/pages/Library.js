import React from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import App from "../App.css";
import Popup from "../components/Popup.js";

export default function Library() {
    const [book, setBook] = React.useState(null);
    const [show, setShow] = React.useState(false);

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
                        <BookTable setBook={setBook} setShow={setShow} />
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
            <Popup show={show} book={book} setShow={setShow} />
        </>
    );
}
