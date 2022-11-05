import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

export default function Popup({ show, setShow, book, setManagedBook }) {
    let modalTitle = "";
    let buttonName = "";

    let autoFillTitle = "";
    let autoFillGenre = "";
    let autoFillWantedI = "";
    let autoFillCurrentI = "";
    let autoFillPrice = "";

    try { // React runs on startup for some reason so this has to be wrapped in a try catch for null to work
        if (book !== null) {
            modalTitle = "Edit This Book";
            buttonName = "Edit Book";
            autoFillTitle = book[0].Title;
            autoFillGenre = book[0].Genre;
            autoFillWantedI = book[0].InventoryWanted;
            autoFillCurrentI = book[0].Inventory;
            autoFillPrice = book[0].Price;
        } else {
            modalTitle = "Add a Book";
            buttonName = "Add Book";
        }
    } catch {}

    let [title, setTitle] = useState(autoFillTitle);
    let [genre, setGenre] = useState(autoFillGenre);
    let [wantedI, setWantedI] = useState(autoFillWantedI);
    let [currentI, setCurrentI] = useState(autoFillCurrentI);
    let [price, setPrice] = useState(autoFillPrice);

    let previousTitle = useRef();
    let previousGenre = useRef();
    let previousWantedI = useRef();
    let previousCurrentI = useRef();
    let previousPrice = useRef();

    useEffect(() => {
        previousTitle.current = title;
        previousGenre.current = genre;
        previousWantedI.current = wantedI;
        previousCurrentI.current = currentI;
        previousPrice.current = price;
    }, [title, genre, wantedI, currentI, price]);

    useEffect(() => {
        // When there is a new book, autoFill fields will update
        setTitle(autoFillTitle);
        setGenre(autoFillGenre);
        setWantedI(autoFillWantedI);
        setCurrentI(autoFillCurrentI);
        setPrice(autoFillPrice);
    }, [
        autoFillCurrentI,
        autoFillGenre,
        autoFillPrice,
        autoFillTitle,
        autoFillWantedI,
        book,
    ]);

    let editBook = (e) => {
        e.preventDefault();
        book[0].Title = title;
        book[0].Genre = genre;
        book[0].InventoryWanted = wantedI;
        book[0].Inventory = currentI;
        book[0].Price = price;
        setManagedBook(book);
        setShow(false);
    };

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
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <label>Genre: </label>
                            <input
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                            <br />
                            <label>C. Inventory:</label>
                            <input
                                type="text"
                                value={wantedI}
                                onChange={(e) => setWantedI(e.target.value)}
                            />
                            <br />
                            <label>W. Inventory:</label>
                            <input
                                type="text"
                                value={currentI}
                                onChange={(e) => setCurrentI(e.target.value)}
                            />
                            <br />
                            <label>Price: </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <br />
                        </div>
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            editBook(e);
                        }}
                    >
                        {buttonName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
