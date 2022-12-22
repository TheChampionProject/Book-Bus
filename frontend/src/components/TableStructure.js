import React from "react";
import BookTable from "./BookTable.js";
import TableHeader from "./TableHeader.js";
import Table from "react-bootstrap/Table";
import "../App.css";

export default function TableStructure({
    mode,
    setBook,
    setShowEditPopup,
    managedBook,
    setManagedBook,
    setAlert,
    searchQuery,
    books,
    setBooks,
    setShowGC,
    genreFilter
}) {
    return (
        <div className="BookTableParent">
            <div className="BookTable">
                <div className="container mt-3">
                    <Table striped bordered hover className="ActualBookTable">
                        <TableHeader mode={mode} className="fixed-top" />
                        <tbody>
                            <BookTable
                                setBook={setBook}
                                setShowEditPopup={setShowEditPopup}
                                managedBook={managedBook}
                                setManagedBook={setManagedBook}
                                setAlert={setAlert}
                                searchQuery={searchQuery}
                                mode={mode}
                                books={books}
                                setBooks={setBooks}
                                setShowGC={setShowGC}
                                genreFilter={genreFilter}
                            />
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
