import { Modal, Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QueryResults from "./QueryResults.js";
import "../App.css";

export default function AddPopup({
    showAddPopup,
    setShowAddPopup,
    setAlert,
    setShowEditPopup,
    setBook,
    books,
}) {
    const [queryList, setQueryList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setShowTable(false);
    }, [showAddPopup]);

    useEffect(() => {
        const statusKeyboardInput = (e) => {
            if (e.keyCode === 220) manuallyAdd();
        };

        window.addEventListener("keydown", statusKeyboardInput);
        return () => window.removeEventListener("keydown", statusKeyboardInput);
    });

    const manuallyAdd = () => {
        setBook(null);
        setShowAddPopup(false);
        setShowEditPopup(true);
    };

    const searchForBook = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    process.env.REACT_APP_BACKEND_URL + "getSearchQueryBooks",
                    {
                        title: searchQuery, mode: "titleSearch",
                    }
                )
                .catch(() => {
                    setAlert({
                        show: true,
                        message:
                            "There was a problem with your search query. Please refresh and try again.",
                        success: false,
                    });
                })
                .then((response) => {
                    setShowTable(true);
                    if (response.data === "Error") {
                        setShowTable(false);

                        setAlert({
                            show: true,
                            message:
                                "There was a problem with your search query. Please refresh and try again.",
                            success: false,
                        });

                        setTimeout(() => {
                            setAlert({
                                show: false,
                            });
                        }, 3000);
                    } else setQueryList(response.data);
                });
        } catch {
            setShowTable(false);

            setAlert({
                show: true,
                message:
                    "There was a problem with your search query. Please refresh and try again.",
                success: false,
            });

            setTimeout(() => {
                setAlert({
                    show: false,
                });
            }, 3000);
        }
    };
    return (
        <>
            <Modal show={showAddPopup} onHide={() => setShowAddPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search For a Title"
                            className="AddPopup"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                searchForBook(e);
                            }}
                        >
                            Search
                        </Button>

                        <button
                            className="FakeLink"
                            onClick={(e) => {
                                e.preventDefault();
                                manuallyAdd(e);
                            }}
                            style={{
                                display: true ? "" : "none",
                                marginLeft: "1rem",
                            }}
                        >
                            Can't Find It? Manually Add
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ display: showTable ? "" : "none" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            <QueryResults
                                queryList={queryList}
                                setShowAddPopup={setShowAddPopup}
                                setShowEditPopup={setShowEditPopup}
                                setBook={setBook}
                                setAlert={setAlert}
                                setShowTable={setShowTable}
                                books={books}
                            />
                        </tbody>
                    </Table>
                </Modal.Footer>
            </Modal>
        </>
    );
}
