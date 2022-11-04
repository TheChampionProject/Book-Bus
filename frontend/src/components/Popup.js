import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useRef } from "https://cdn.skypack.dev/react";
import App from "../App.css";

export default function Popup({ show, setShow, book }) {
    let modalTitle = "";
    let buttonName = "";

    let titleValue = "";
    let genreValue = "";
    let wantedIValue = "";
    let currentIValue = "";
    let priceValue = "";

    if (book !== null) {
        modalTitle = "Edit This Book";
        buttonName = "Edit Book";

        titleValue = book.Title;
        genreValue = book.Genre;
        wantedIValue = book.InventoryWanted;
        currentIValue = book.Inventory;
        priceValue = book.Price;
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
                        <div className="modal-body EditBookPopup">
                            <label>Title: </label>
                            <input type="text" defaultValue={titleValue} />
                            <br />
                            <label>Genre: </label>
                            <input type="text" defaultValue={genreValue} />
                            <br />
                            <label>C. Inventory:</label>
                            <input type="text" defaultValue={wantedIValue} />
                            <br />
                            <label>W. Inventory:</label>
                            <input type="text" defaultValue={currentIValue} />
                            <br />
                            <label>Price: </label>
                            <input type="text" defaultValue={priceValue} />
                            <br />
                        </div>
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">{buttonName}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
