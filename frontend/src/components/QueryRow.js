import React from "react";
import "../App.css";
import axios from "axios";
export default function QueryRow({
    book,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
}) {
    const refinedBook = {}; // In order to get the Google Books autocomplete to work with our book-object format.

    const add = async (e) => {
        e.preventDefault();
        setShowAddPopup(false);

        console.log(book);

        refinedBook.Title = book.volumeInfo.title;
        refinedBook.Genre = "N/A";
        refinedBook.Inventory = 1;
        refinedBook.Needed = 0;
        refinedBook.Index = -1; // So that when book table sees it it knows its a new book and will give it the next available index.

        if (book.saleInfo.saleability === "NOT_FOR_SALE") {
            let ISBN = book.volumeInfo.industryIdentifiers[0].identifier;
            let booksRunPrice = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "getBookPrice",
                { ISBN }
            );

            if (typeof booksRunPrice.data.price === "number")
                refinedBook.Price = booksRunPrice.data.price;
            else refinedBook.Price = "N/A";
        } else refinedBook.Price = book.saleInfo.listPrice.amount;
        setBook(refinedBook);
        setShowEditPopup(true);
    };

    return (
        <tr>
            <td>{book.volumeInfo.title}</td>
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
