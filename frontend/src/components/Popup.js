import React from "react";
import { Modal, Button } from "react-bootstrap";
import App from "../App.css";

export default function Popup({ show, setShow, book }) {
    let modalTitle = "";
    let buttonName = "";

    let autoFillTitle = "";
    let autoFillGenre = "";
    let autoFillWantedI = "";
    let autoFillCurrentI = "";
    let autoFillPrice = "";

    if (book !== null) {
        modalTitle = "Edit This Book";
        buttonName = "Edit Book";
        autoFillTitle = book.Title;
        autoFillGenre = book.Genre;
        autoFillWantedI = book.InventoryWanted;
        autoFillCurrentI = book.Inventory;
        autoFillPrice = book.Price;
    } else {
        modalTitle = "Add a Book";
        buttonName = "Add Book";
    }

    console.log(autoFillTitle);
    let [title, setTitle] = React.useState(autoFillTitle);
    let [genre, setGenre] = React.useState(autoFillGenre);
    let [wantedI, setWantedI] = React.useState(autoFillWantedI);
    let [currentI, setCurrentI] = React.useState(autoFillCurrentI);
    let [price, setPrice] = React.useState(autoFillPrice);
    console.log(title);

    let previousTitle = React.useRef();
    let previousGenre = React.useRef();
    let previousWantedI = React.useRef();
    let previousCurrentI = React.useRef();
    let previousPrice = React.useRef();

    React.useEffect(() => {
        previousTitle.current = title;
        previousGenre.current = genre;
        previousWantedI.current = wantedI;
        previousCurrentI.current = currentI;
        previousPrice.current = price;
    }, [title, genre, wantedI, currentI, price]);

    React.useEffect(() => {
        setTitle(autoFillTitle);
        setGenre(autoFillGenre);
        setWantedI(autoFillWantedI);
        setCurrentI(autoFillCurrentI);
        setPrice(autoFillPrice);

    }, [autoFillCurrentI, autoFillGenre, autoFillPrice, autoFillTitle, autoFillWantedI, book]);

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
                    <Button variant="secondary">{buttonName}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
