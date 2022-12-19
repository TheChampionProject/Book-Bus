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
    lastGenre,
    scanMode,
    setShowAddPopup,
}) {
    let autoFillTitle = "";
    let autoFillGenre = "N/A";
    let autoFillInventory = "1";
    let autoFillNeeded = 0;
    let autoFillPrice = "";
    let addBook = false,
        complete = false;

    let calledEdit = useRef(false);
    let interrupt = useRef(false);

    let priceRef = useRef(null),
        titleRef = useRef(null); // For the cursor to auto click

    try {
        if (book !== null) {
            autoFillTitle = book.Title;
            autoFillGenre = lastGenre.current;
            autoFillInventory = book.Inventory;
            autoFillNeeded = book.Needed;
            autoFillPrice = book.Price;
        } else {
            addBook = true;
        }
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
    let previousInventory = useRef("1");
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
        complete = false;
    }, [
        autoFillInventory,
        autoFillNeeded,
        autoFillGenre,
        autoFillPrice,
        autoFillTitle,
        book,
    ]);

    useEffect(() => {
        if (!showEditPopup) return;

        if (addBook) {
            for (let i = 0; i < 5; i++) titleRef.current.focus();
        } else priceRef.current.focus();

        calledEdit.current = false;
        interrupt.current = false;
        if (scanMode && !addBook) {
            setTimeout(() => {
                if (calledEdit.current) {
                    return;
                }

                if (!interrupt.current && !calledEdit.current) {
                    editBook();
                    calledEdit.current = true;
                    if (complete) setShowAddPopup(true); // If they didn't have a genre selected
                }
            }, 3000);
        }
    }, [showEditPopup]);

    useEffect(() => {
        const statusKeyboardInput = (e) => {
            if (e.keyCode) interrupt.current = true;
        };

        window.addEventListener("keydown", statusKeyboardInput);
        return () => window.removeEventListener("keydown", statusKeyboardInput);
    });

    useEffect(() =>
        window.addEventListener("click", () => (interrupt.current = true))
    );

    const editBook = () => {
        if ((genre === "N/A" || genre === "") && showEditPopup) {
            alert("Please select a genre");
            return;
        }

        if (String(price).startsWith("$")) price = price.slice(1);

        if (addBook) {
            book = {};
            book.AddDates = [];
            book.AddDates.push(new Date().toISOString());
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

        lastGenre.current = genre;
        complete = true;
        interrupt.current = false;
        setManagedBook(book);
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
                        {addBook ? "Manually Add a Book" : "Edit " + book.Title}
                    </Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className="modal-body">
                            <label className="Popup">Title: </label>
                            <input
                                type="text"
                                value={title}
                                ref={titleRef}
                                onChange={(e) => {
                                    if (e.target.value !== "\\")
                                        setTitle(e.target.value);
                                }}
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
                                            setGenre("Explore: Sports")
                                        }
                                    >
                                        Explore: Sports
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

                            <label
                                className="Popup"
                                style={{ marginRight: "3.5em" }}
                            >
                                Price:
                            </label>
                            <label className="Popup" style={{ width: "10px" }}>
                                $
                            </label>

                            <input
                                type="text"
                                ref={priceRef}
                                style={{ maxWidth: "4em" }}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <br />
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
                                        setInventory(++inventory);
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
                                        setNeeded(--needed);
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
                                e.preventDefault();
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
