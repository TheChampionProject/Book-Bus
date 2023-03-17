import React, { useState, useEffect } from "react";
import GiftConfirmation from "../components/GiftConfirmation.js";
import TableStructure from "../components/TableStructure";
import ManageHeader from "../components/ManageHeader.js";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getSignedInUserInfoFB } from "../FirebaseFunctions";

export default function ManagePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [showGC, setShowGC] = useState(false);
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState(null);
    let [genreFilter, setGenreFilter] = useState("All");

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        const getUsername = async () => {
            try {
                if (!loading && user === null) {
                    alert("You must be signed in to view this page");
                    navigate("/login");
                }

                const info = await getSignedInUserInfoFB(user.uid);

                if (!info.verified) {
                    window.location.href = "/login";
                    alert("You must be verified to gift books!");
                    return;
                }
            } catch {
                window.location.href = "/login";
                alert("You must be signed in to view this page");
            }
        };
        getUsername();
    }, []);

    return (
        <>
            <ManageHeader
                setSearchQuery={setSearchQuery}
                alert={alert}
                genreFilter={genreFilter}
                setGenreFilter={setGenreFilter}
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
                genreFilter={genreFilter}
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
