import React from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";
import Table from "react-bootstrap/Table";

export default function Library() {
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
                >
                    +
                </button>
            </div>
        </>
    );
}
