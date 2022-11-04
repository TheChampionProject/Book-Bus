import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useRef } from "https://cdn.skypack.dev/react";

export default function Popup({ show, setShow, book }) {
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            ></div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                        {/* <div className="modal-body">
                            <label className="EditBookPopup">Title: </label>
                            <input type="text" value={book.Title} />
                            <br />
                            <label className="EditBookPopup">Genre: </label>
                            <input type="text" value={book.Genre} /> <br />
                            <label className="EditBookPopup">
                                C. Inventory:
                            </label>
                            <input type="text" value={book.Inventory} /> <br />
                            <label className="EditBookPopup">
                                W. Inventory:
                            </label>
                            <input type="text" value={book.InventoryWanted} />
                            <br />
                            <label className="EditBookPopup">Price: </label>
                            <input type="text" value={book.Price} /> <br />
                        </div> */}
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Add Book</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
