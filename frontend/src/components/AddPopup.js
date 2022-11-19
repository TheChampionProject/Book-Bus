import { Modal, Button } from "react-bootstrap";
import React, { useRef } from "react";
import "../App.css";

export default function AddPopup({ showAddPopup, setShowAddPopup }) {
    const searchQuery = useRef();

    const searchForBook = (e) => {
        e.preventDefault();
        console.log(searchQuery.current.value);
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
                            placeholder="Search"
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
