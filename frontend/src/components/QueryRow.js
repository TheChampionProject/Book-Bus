import React from "react";
import "../App.css";
export default function QueryRow({
    book,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
}) {
    const refinedBook = {}; // In order to get the Google Books autocomplete to work with our book-object format.

    const add = (e) => {
        e.preventDefault();
        setShowAddPopup(false);

        console.log(book);
        
        refinedBook.Title = book.title;
        refinedBook.Genre = "N/A";
        refinedBook.Inventory = 1;
        refinedBook.Needed = 0;
        refinedBook.Price = "N/A";
        refinedBook.Index = -1; // So that when book table sees it it knows its a new book and will give it the next available index.

        setBook(refinedBook);
        setShowEditPopup(true);
    };

    return (
        <tr>
            <td>{book.title}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => add(e)}
                >
                    Add
                </button>
            </td>
        </tr>
    );
}
