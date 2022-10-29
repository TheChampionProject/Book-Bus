import BookTable from "./BookTable.js";
import Popup from "./Popup.js";
import { Table, Modal, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import './App.css'
function App() {
    let bookID;
    const tbody = useRef();
    const table = useRef();

    // All these are for the info to be passed into the edit book popup
    const titleMod = useRef();
    const genreMod = useRef();
    const inventoryMod = useRef();
    const inventoryWantedMod = useRef();
    const priceMod = useRef();
    const popupTitle = useRef();

    // const addModButton = useRef();
    // const editModButton = useRef();

    const [showAddBook, setShowAddBook] = useState(false);

    const handleShowAddBook = () => setShowAddBook(!showAddBook);

    function handleAddBook() {
        // bookID = index;

        console.log("Add Book Interface");
        titleMod.value = "";
        genreMod.value = "";
        inventoryMod.value = "";
        inventoryWantedMod.value = "";
        priceMod.value = "";
        //editModButton.style.display = "none";
        //addModButton.style.display = "inline-block";
        popupTitle.innerHTML = "Add A Book";

        //<Popup show={showAddBook} handleShow={handleShow} />;
        //document.getElementById("#ModalCenter").modal("show"); // Bring up the popup
        handleShowAddBook();
    }

    return (
        <>
            <div className="container mt-3">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Current Inventory</th>
                            <th>Wanted Inventory</th>
                            <th>Price</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                </Table>
                <button
                    type="button"
                    className="btn btn-primary my-2 AddBookButton"
                    onClick={handleAddBook}
                >
                    +
                </button>
            </div>
            <BookTable />
            <Popup show={showAddBook} handleShow={handleShowAddBook} />;
        </>
    );
}

export default App;
