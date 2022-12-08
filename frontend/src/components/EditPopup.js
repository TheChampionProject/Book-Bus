import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";

export default function EditPopup({
    showEditPopup,
    setShowEditPopup,
    book,
    setManagedBook,
    setAlert,
}) {
    let autoFillTitle = "";
    let autoFillGenre = "N/A";
    let autoFillInventory = "1";
    let autoFillNeeded = 0;
    let autoFillPrice = 0;
    let addBook = false;

    try {
        if (book !== null) {
            autoFillTitle = book.Title;
            autoFillGenre = book.Genre;
            autoFillInventory = book.Inventory;
            autoFillNeeded = book.Needed;
            autoFillPrice = book.Price;
        } else addBook = true;
    } catch {
        setAlert({
            show: true,
            message:
                "There was a problem with your book changes. Please refresh and try again.",
            success: false,
        });
    }

    let [title, setTitle] = useState(autoFillTitle);
    let [genre, setGenre] = useState(autoFillGenre);
    let [inventory, setInventory] = useState(autoFillInventory);
    let [needed, setNeeded] = useState(autoFillNeeded);
    let [price, setPrice] = useState(autoFillPrice);

    let previousTitle = useRef("");
    let previousGenre = useRef("");
    let previousInventory = useRef("");
    let previousNeeded = useRef("");
    let previousPrice = useRef("");

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

    const editBook = (e) => {
        e.preventDefault();

        if (genre === "N/A") {
            alert("Please select a genre");
            return;
        }

        if (String(price).startsWith("$")) price = price.slice(1);

        if (addBook) {
            book = {};
            book.AddDates = [];
            book.AddDates.push(new Date().toISOString()); // Date for when book is added
        }

        if (inventory > book.Inventory) {
            if (book.AddDates === undefined) book.AddDates = [];
            else book.AddDates.push(...book.AddDates);

            for (let i = 0; i < inventory - book.Inventory; i++)
                book.AddDates.push(new Date().toISOString());
        }

        book.Title = title;
        book.Genre = genre;
        book.Inventory = inventory;
        book.Needed = needed;
        book.Price = price;

        if (
            autoFillInventory !== inventory || // Only if stuff was changed
            autoFillNeeded !== needed ||
            autoFillTitle !== title ||
            autoFillGenre !== genre ||
            autoFillPrice !== price
        ) {
            setManagedBook(book);
        }

        setShowEditPopup(false);
    };

    const close = () => {
        setTitle("");
        setGenre("");
        setInventory("");
        setNeeded(0);
        setPrice(0);
        setShowEditPopup(false);
    };

    return (
        <>
            <Modal show={showEditPopup} onHide={() => close()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {addBook ? "Manually Add a Book" : "Edit " + title}
                    </Modal.Title>
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
                            <label className="Popup Genre-Label">Genre: </label>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    className="ManagePopupDropdown"
                                >
                                    {genre}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="ManagePopupDropdownMenu">
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre("Explore: Fantasy")
                                        }
                                    >
                                        Explore: Fantasy
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre(
                                                "Explore: Historical Fiction"
                                            )
                                        }
                                    >
                                        Explore: Historical Fiction
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => setGenre("Explore")}
                                    >
                                        Explore
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre("Laugh: Graphic Novel")
                                        }
                                    >
                                        Laugh: Graphic Novel
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => setGenre("Laugh")}
                                    >
                                        Laugh
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre("Be Inspired: People")
                                        }
                                    >
                                        Be Inspired: People
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre("Be Inspired: Event")
                                        }
                                    >
                                        Be Inspired: Event
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => setGenre("Be Inspired")}
                                    >
                                        Be Inspired
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            setGenre("Solve It: Activity")
                                        }
                                    >
                                        Solve It: Activity
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => setGenre("Solve It")}
                                    >
                                        Solve It
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <br />
                            <label className="Popup">Price: </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <label className="Popup">Inventory: </label>

                            <div className="btn-group modal-body">
                                <input
                                    type="button"
                                    value="-"
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setInventory(--inventory);
                                    }}
                                />

                                <input
                                    type="text"
                                    className="QuantityBox"
                                    value={inventory}
                                    onChange={(e) => {
                                        setInventory(e.target.value);
                                    }}
                                />

                                <input
                                    type="button"
                                    value="+"
                                    className="btn btn-success"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setInventory(++inventory); // It has to be clicked twice to work
                                    }}
                                />
                            </div>

                            <label className="Popup">Additional Need: </label>

                            <div className="btn-group modal-body">
                                <input
                                    type="button"
                                    value="-"
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setNeeded(--needed); // It has to be clicked twice to work
                                    }}
                                />

                                <input
                                    type="text"
                                    className="QuantityBox"
                                    value={needed}
                                    onChange={(e) => {
                                        setNeeded(e.target.value);
                                    }}
                                />

                                <input
                                    type="button"
                                    value="+"
                                    className="btn btn-success"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setNeeded(++needed);
                                    }}
                                />
                            </div>
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
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
