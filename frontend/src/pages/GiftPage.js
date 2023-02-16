import React, { useState } from "react";
import GiftConfirmation from "../components/GiftConfirmation.js";
import TableStructure from "../components/TableStructure";
import Header from "../components/Header";
import "../App.css";
import UserProtection from "../components/UserProtection.js";
import { useAuthState } from "react-firebase-hooks/auth"; // use this in every page
import { auth } from "../FirebaseFunctions"; // use this in every page

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
    let [genreFilter, setGenreFilter] = useState("All");
//    const [user, loading] = useAuthState(auth);
//
//    useEffect(() => {
//        if (!loading && !user) {
//            navigate("/login");
//        }
//    }, [user]);

    return (
        <>
            <UserProtection />
            <Header
                setSearchQuery={setSearchQuery}
                alert={alert}
                href={"/home"}
                hrefName={"Home Page"}
                useSearchBar={true}
                setGenreFilter={setGenreFilter}
                genreFilter={genreFilter}
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
