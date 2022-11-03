import React from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";
import App from "../App.css";
import Popup from "../components/Popup.js";

export default function Library() {
    let handleAddBook = React.useRef();

    handleAddBook = () => {
        console.log("hi");
        <Popup show={true} />;
    }
    return (
        <>
            <div className="container mt-3">
                <Table striped bordered hover>
                    <TableHeader />
                    <tbody>
                        <BookTable />
                    </tbody>
                </Table>
                <button
                    type="button"
                    className="btn btn-primary my-2 AddBookButton"
                    onClick={handleAddBook}
                >
                    +
                </button>
            </div>
        </>
    );
}
