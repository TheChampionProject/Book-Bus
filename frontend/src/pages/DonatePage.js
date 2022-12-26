import React, { useState } from "react";
import "../App.css";
import TableStructure from "../components/TableStructure";

import Header from "../components/Header";

export default function DonatePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");
    let [books, setBooks] = useState(null);
    let [genreFilter, setGenreFilter] = useState("All");


    return (
        <>
            <Header
                setSearchQuery={setSearchQuery}
                alert={alert}
                href={"/login"}
                hrefName={"Login/Signup"}
            />

            <div className="TextCenterDiv">
                <em>
                    Please send books to the Junior League Office at 8686 New
                    Trails Dr, The Woodlands, TX 77381
                </em>
            </div>

            <TableStructure
                mode="donate"
                managedBook={managedBook}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
                searchQuery={searchQuery}
                books={books}
                setBooks={setBooks}
                genreFilter={genreFilter}
            />
        </>
    );
}
