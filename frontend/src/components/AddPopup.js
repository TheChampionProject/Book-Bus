import { Modal, Button } from "react-bootstrap";
import React, { useRef } from "react";
import axios from "axios";
import "../App.css";

export default function AddPopup({ showAddPopup, setShowAddPopup }) {
    const searchQuery = useRef();

    const searchForBook = async (e) => {
        e.preventDefault();
        let query = await axios
            .post(process.env.REACT_APP_BACKEND_URL + "getSearchQueryBooks", {
                title: searchQuery.current.value,
            })
            .catch((e) => {
                console.log(e);
            });

        console.log(query.data);
    };
    return (
        <>
            <Modal show={showAddPopup} onHide={() => setShowAddPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <input
                            type="text"
                            placeholder="Search For a Title"
                            className="AddPopup"
                            ref={searchQuery}
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
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}
