import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

export default function Popup({ show, setShow, book, setManagedBook }) {
    let emptyBook = {
        Title: "",
        Genre: "",
        Inventory: "",
        Needed: "",
        Price: "",
        Index: -1,
    };
    let addBook;
    let modalTitle = "";
    let buttonName = "";

    let autoFillTitle = "";
    let autoFillGenre = "";
    let autoFillInventory = "";
    let autoFillNeeded = "";
    let autoFillPrice = "";

    try {
        if (book !== null) {
            modalTitle = "Edit This Book";
            buttonName = "Edit Book";
            autoFillTitle = book.Title;
            autoFillGenre = book.Genre;
            autoFillInventory = book.Inventory;
            autoFillNeeded = book.Needed;
            autoFillPrice = book.Price;
        } else {
            addBook = true;
            modalTitle = "Add a Book";
            buttonName = "Add Book";
        }
    } catch {}

    let [title, setTitle] = useState(autoFillTitle);
    let [genre, setGenre] = useState(autoFillGenre);
    let [inventory, setInventory] = useState(autoFillInventory);
    let [needed, setNeeded] = useState(autoFillNeeded);
    let [price, setPrice] = useState(autoFillPrice);

    let previousTitle = useRef();
    let previousGenre = useRef();
    let previousInventory = useRef();
    let previousNeeded = useRef();
    let previousPrice = useRef();

    useEffect(() => {
        previousTitle.current = title;
        previousGenre.current = genre;
        previousInventory.current = inventory;
        previousNeeded.current = needed;
        previousPrice.current = price;
    }, [title, genre, inventory, needed, price]);

    useEffect(() => {
        // When there is a new book, autoFill fields will update
        setTitle(autoFillTitle);
        setGenre(autoFillGenre);
        setInventory(autoFillInventory);
        setNeeded(autoFillNeeded);
        setPrice(autoFillPrice);
    }, [
        autoFillInventory,
        autoFillNeeded,
        autoFillGenre,
        autoFillPrice,
        autoFillTitle,
        book,
    ]);

    let editBook = (e) => {
        e.preventDefault();

        if (addBook) {
            book = emptyBook; // Give book a value so it can be edited
        }

        book.Title = title;
        book.Genre = genre;
        book.Inventory = inventory;
        book.Needed = needed;
        book.Price = price;
        setManagedBook(book);
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className="modal-body">
                            <label className="Popup">Title: </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <label className="Popup">Genre: </label>
                            <input
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />

                            <br />
                            <label className="Popup">Inventory: </label>
                            <input
                                type="text"
                                value={inventory}
                                onChange={(e) => setInventory(e.target.value)}
                            />
                            <br />
                            <label className="Popup">Price: </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <br />

                            <label className="Popup">Additional Need: </label>
                            <input type="checkbox">0 - 5</input>
                           
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                editBook(e);
                            }}
                        >
                            {buttonName}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
