import { Modal, Button, Table } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
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
    scanMode,
    setScanMode,
}) {
    const [queryList, setQueryList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const textField = useRef(null);

    useEffect(() => {
        setShowTable(false);
        setSearchQuery("");
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

    const searchForBook = async () => {
        let request = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "getSearchQueryBooks",
            {
                title: searchQuery,
                mode: scanMode ? "" : "titleSearch",
            }
        );

        if (request.data === "Error") {
            setAlert({
                show: true,
                message: "We couldn't find that book. Please add it manually.",
                success: false,
            });

            manuallyAdd();

            setTimeout(() => {
                setAlert({
                    show: false,
                });
            }, 3000);
        } else {
            setQueryList(request.data);

            setShowTable(true);
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
                            ref={textField}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
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
                                marginLeft: "1rem",
                            }}
                        >
                            Can't Find It? Manually Add
                        </button>

                        <button
                            className="FakeLink"
                            onClick={(e) => {
                                e.preventDefault();
                                setScanMode(!scanMode);
                                textField.current.focus();
                            }}
                            style={{
                                marginLeft: "65%",
                            }}
                        >
                            {scanMode ? "Leave " : "Enter "}Scan Mode
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
                                scanMode={scanMode}
                                searchQuery={searchQuery}
                            />
                        </tbody>
                    </Table>
                </Modal.Footer>
            </Modal>
        </>
    );
}
