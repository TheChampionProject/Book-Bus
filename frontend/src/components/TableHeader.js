import React from "react";
import Table from "react-bootstrap/Table";
import App from "../App.css";

export default function TableHeader() {
    return (
        <div className="container mt-3" id="booktable">
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Current Inventory</th>
                        <th>Wanted Inventory</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                </thead>
            </Table>
            <button
                type="button"
                className="btn btn-primary my-2 AddBookButton"
            >
                +
            </button>
        </div>
    );
}
