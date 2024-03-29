import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import GenreDDI from "./GenreDDI";
import "../App.css";
import uuidv4 from "uuid";

export default function EditPopup({
  showEditPopup,
  setShowEditPopup,
  book,
  setManagedBook,
  scanMode,
  setShowAddPopup,
  books,
}) {
  let autoFillTitle = "";
  let autoFillGenre = localStorage.getItem("lastGenre");
  let autoFillInventory = "1";
  let autoFillNeeded = 0;
  let autoFillPrice = "";
  let addBook = useRef(true);
  let complete = false;

  let calledEdit = useRef(false);
  let interrupt = useRef(false);

  let priceRef = useRef(null),
    titleRef = useRef(null); // For the cursor to auto click

  useEffect(() => {
    if (!showEditPopup) return;

    if (book !== null) {
      addBook.current = false;
      autoFillTitle = book.Title;

      autoFillInventory = book.Inventory;
      autoFillNeeded = book.Needed;
      autoFillPrice = book.Price;

      autoFillGenre =
        book.Genre !== "" ? book.Genre : localStorage.getItem("lastGenre");
    } else {
      addBook.current = true;
      autoFillGenre = localStorage.getItem("lastGenre");
      setInventory(1);
      setGenre(autoFillGenre);
    }

    if (addBook.current) {
      setTimeout(() => {
        titleRef.current.focus();
      }, 500);
    } else {
      priceRef.current.focus();
    }
  }, [showEditPopup]);

  let [title, setTitle] = useState();
  let [genre, setGenre] = useState(autoFillGenre);
  let [inventory, setInventory] = useState();
  let [needed, setNeeded] = useState();
  let [price, setPrice] = useState();

  let previousTitle = useRef("");
  let previousGenre = useRef(autoFillGenre);
  let previousInventory = useRef("1");
  let previousNeeded = useRef("");
  let previousPrice = useRef("");

  let modalTitle = "";

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
    const statusKeyboardInput = (e) => {
      if (e.keyCode) interrupt.current = true;
    };

    window.addEventListener("keydown", statusKeyboardInput);
    return () => window.removeEventListener("keydown", statusKeyboardInput);
  });

  const editBook = () => {
    let previousBookInventory = 0;

    if ((genre === "N/A" || genre === "") && showEditPopup) {
      alert("Please select a genre");
      return;
    }

    if (title === "") {
      alert("Please enter a title");
      return;
    }

    if (inventory === "") {
      alert("Please enter an inventory");
      return;
    }

    if (price === "") {
      alert("Please enter a price");
      return;
    }

    if (price > 100) {
      alert("Price cannot be greater than $100");
      return;
    }

    if (String(price).startsWith("$")) price = price.slice(1);

    if (addBook.current) {
      book = {};
      book.UUID = uuidv4();
    }

    if (inventory > book.Inventory) {
      if (!book.AddDates) {
        book.AddDates = [];
      }

      for (let i = 0; i < inventory - book.Inventory; i++)
        book.AddDates.push(new Date().toISOString());
    }

    book.Title = title;
    book.Genre = genre;
    book.Inventory = previousInventory.current;
    book.Needed = needed;
    book.Price = price;

    if (addBook.current) {
      book.Inventory =
        parseInt(previousBookInventory) + parseInt(book.Inventory);
      if (!book.AddDates) book.AddDates = [];
      book.AddDates.push(new Date().toISOString());
    }

    localStorage.setItem("lastGenre", genre);
    complete = true;
    interrupt.current = false;

    setManagedBook(book);
    setShowEditPopup(false);
    setShowAddPopup(true);
  };

  const close = () => {
    if (!showEditPopup) return;
    setTitle("");
    setGenre("");
    setInventory("");
    setNeeded(0);
    setPrice(0);
    setShowEditPopup(false);
  };

  if (addBook.current) modalTitle = "Add a Book";
  else if (!addBook.current && book !== null) modalTitle = "Edit " + book.Title;
  else modalTitle = "Add a Book";

  return (
    <>
      <Modal show={showEditPopup} onHide={() => close()}>
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
                ref={titleRef}
                onChange={(e) => {
                  if (e.target.value !== "\\") setTitle(e.target.value);
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
                  <GenreDDI setFunction={setGenre} />
                </Dropdown.Menu>
              </Dropdown>

              <label className="Popup" style={{ marginRight: "3.5em" }}>
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
                    if (inventory - 1 >= 0) {
                      setInventory(Math.max(0, --inventory));
                    }
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
                    if (needed - 1 >= 0) {
                      setNeeded(Math.max(0, --needed));
                    }
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
