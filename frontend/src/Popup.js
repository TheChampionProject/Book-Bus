import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Popup({ show, handleShow }) {
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            ></div>

            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <></>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Add Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
