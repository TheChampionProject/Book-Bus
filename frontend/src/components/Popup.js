import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useRef } from "https://cdn.skypack.dev/react";

export default function Popup({ show, setShow, book }) {
    console.log(book);
    let modalTitle = "";
    let buttonName = "";
    if (book !== null) {
        modalTitle = "Edit This Book";
        buttonName = "Edit Book";
    } else {
        modalTitle = "Add a Book";
        buttonName = "Add Book";
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
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
                    <Button variant="secondary">{buttonName}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
