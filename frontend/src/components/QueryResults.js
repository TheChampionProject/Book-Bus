import QueryRow from "./QueryRow.js";
import React from "react";
export default function QueryResults({
    queryList,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
    setShowTable,
    books,
}) {
    if (queryList.length === 0) return;
    return queryList.map((book, number) => {
        number++;
        return (
            <QueryRow
                key={number}
                book={book}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setShowEditPopup={setShowEditPopup}
                setAlert={setAlert}
                setShowTable={setShowTable}
                books={books}
            />
        );
    });
}
