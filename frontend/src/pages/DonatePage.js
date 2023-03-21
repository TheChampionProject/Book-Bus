import React, { useState } from "react";
import "../App.css";
import TableStructure from "../components/TableStructure";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DonatePage() {
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [setAlert] = useState({
        show: false,
        message: "",
        success: false,
    });
    let [books, setBooks] = useState(null);
    const navigate = useNavigate();

    return (
        <>
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center", height: "4em" }}
            >
                <div
                    style={{
                        marginTop: ".5em",
                        position: "relative",
                    }}
                >
                    <Button
                        variant="primary"
                        onClick={() =>
                            (window.location.href =
                                "https://thechampionproject.org/")
                        }
                        style={{
                            position: "absolute",
                            left: "1em",
                            top: "0em",
                        }}
                    >
                        Our Mission
                    </Button>
                    <h2 style={{}} className="CPStyleFull">
                        The Champion Project
                    </h2>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/login")}
                        style={{
                            position: "absolute",
                            right: "1em",
                            top: "0em",
                        }}
                    >
                        Login/Signup
                    </Button>
                </div>
            </div>

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
                searchQuery={""}
                books={books}
                setBooks={setBooks}
                genreFilter={"All"}
            />
        </>
    );
}
