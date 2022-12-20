import React, { useState } from "react";
import GiftConfirmation from "../components/GiftConfirmation.js";
import TableStructure from "../components/TableStructure";
import Header from "../components/Header";

import "../App.css";

export default function ManagePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");
    const [showGC, setShowGC] = useState(false);
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState(null);

    return (
        <>
            <Header
                setSearchQuery={setSearchQuery}
                alert={alert}
                href={"/manage"}
                hrefName={"Manage Page"}
                useSearchBar={true}
            />

            <TableStructure
                mode="gift"
                setBook={setBook}
                managedBook={managedBook}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
                setShowGC={setShowGC}
                searchQuery={searchQuery}
                books={books}
                setBooks={setBooks}
            />
            <GiftConfirmation
                showGC={showGC}
                setShowGC={setShowGC}
                book={book}
                setManagedBook={setManagedBook}
            />
        </>
    );
}
