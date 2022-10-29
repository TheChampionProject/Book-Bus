import React from "react";
import { useRef, useState } from "https://cdn.skypack.dev/react";
import Table from "react-bootstrap/Table";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { firebaseConfig } from "../keys.js";

export default function BookTable({ bookArray }) {
    let bookID, numOfBooks; // bookID refers to the index of the book. Used to show which book is being edited so Firebase can find it. numOfBooks refers to the number of books in the database, that way an added book can be set to the next index.

    // Firebase Code
    initializeApp(firebaseConfig);
    const db = getDatabase();
    let books = [];

    async function addItemToTable(
        title,
        genre,
        inventory,
        inventoryWanted,
        price
    ) {
        bookID++;
        let tableRow = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");

        td1.innerHTML = bookID;
        td2.innerHTML = title;
        td3.innerHTML = genre;
        td4.innerHTML = inventory;
        td5.innerHTML = inventoryWanted;
        td6.innerHTML = "$" + price;

        td1.id = "number" + bookID;
        td2.id = "title" + bookID;
        td3.id = "genre" + bookID;
        td4.id = "inventory" + bookID;
        td5.id = "inventoryWanted" + bookID;
        td6.id = "price" + bookID;

        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);
        tableRow.appendChild(td4);
        tableRow.appendChild(td5);
        tableRow.appendChild(td6);

        // Code for adding and editing books. Number is passed in so that it can auto complete the fields
        var btn = document.createElement("button");
        btn.innerHTML = "Edit Book";
        btn.classNameList.add("btn");
        btn.classNameList.add("tableclassName");
        btn.classNameList.add("btn-primary");
        btn.classNameList.add("my-2");
        btn.id = bookID;

        btn.onclick = function () {
            // When the edit button is clicked, it will open the edit book popup
            //fillTBoxes(btn.id);
        };

        tableRow.appendChild(btn);
        //tbody.appendChild(tableRow);
    }

    // addModButton.onclick = function () {
    //     // Inside of add book popup
    //     addBook();
    // };
    // editModButton.onclick = function () {
    //     // When you submit the edits from the popup
    //     editBook();
    // };
    // addBookButton.onclick = function () {
    //     // When you click the add book button from the home page
    //     fillTBoxes(addBookButton.id);
    // };

    // async function fillTBoxes(index) {
    //     bookID = index;
    //     if (index === "AddBookButton") {
    //         console.log("Add Book Interface");
    //         titleMod.value = "";
    //         genreMod.value = "";
    //         inventoryMod.value = "";
    //         inventoryWantedMod.value = "";
    //         priceMod.value = "";
    //         editModButton.style.display = "none";
    //         addModButton.style.display = "inline-block";
    //         popupTitle.innerHTML = "Add A Book";
    //     } else {
    //         console.log("index " + index);
    //         titleMod.value = document.getElementById("title" + index).innerHTML;
    //         genreMod.value = document.getElementById("genre" + index).innerHTML;
    //         inventoryMod.value = document.getElementById(
    //             "inventory" + index
    //         ).innerHTML;
    //         inventoryWantedMod.value = document.getElementById(
    //             "inventoryWanted" + index
    //         ).innerHTML;
    //         priceMod.value = document
    //             .getElementById("price" + index)
    //             .innerHTML.substring(1);
    //         editModButton.style.display = "inline-block";
    //         addModButton.style.display = "none";
    //         popupTitle.innerHTML = "Edit This Book";
    //     }

    //     document.getElementById("#ModalCenter").modal("show"); // Bring up the popup
    // }

    async function addToTable(book) {
        bookID = 0;
        //tbody.innerHTML = "";

        for (let i = 0; i < books.length; i++) {
            // Loop through all books that are in the database and add them to the table
            await addItemToTable(
                book[i].Title,
                book[i].Genre,
                book[i].Inventory,
                book[i].InventoryWanted,
                book[i].Price
            );
        }
    }

    async function getDataRealTime() {
        bookID = 0;
        //tbody.innerHTML = "";
        books = [];

        const dbRef = ref(db, "/");
        await onValue(dbRef, async (snapshot) => {
            bookID = 0;
            //tbody.innerHTML = "";
            books = [];
            numOfBooks = 0;
            await snapshot.forEach((childSnapshot) => {
                numOfBooks++;
                books.push(childSnapshot.val());
            });

            console.log(books);
            addToTable(books);
        });
    }

    // async function addBook() {
    //     if (titleMod.value === "") {
    //         alert("Every book needs a title!");
    //         return;
    //     }

    //     console.log("Num of Books " + numOfBooks);

    //     set(ref(db, "/" + numOfBooks), {
    //         Title: titleMod.value,
    //         Genre: genreMod.value,
    //         Inventory: inventoryMod.value,
    //         InventoryWanted: inventoryWantedMod.value,
    //         Price: priceMod.value,
    //     })
    //         .then(() => {
    //             document.getElementById("#ModalCenter").modal("hide");
    //         })
    //         .catch((error) => {
    //             alert("Book failed to add");
    //             document.getElementById("#ModalCenter").modal("hide");
    //         });
    // }

    // async function editBook() {
    //     set(ref(db, "/" + bookID), {
    //         Title: titleMod.value,
    //         Genre: genreMod.value,
    //         Inventory: inventoryMod.value,
    //         InventoryWanted: inventoryWantedMod.value,
    //         Price: priceMod.value,
    //     })
    //         .then(() => {
    //             document.getElementById("#ModalCenter").modal("hide");
    //         })
    //         .catch((error) => {
    //             alert("Book failed to edit");
    //             document.getElementById("#ModalCenter").modal("hide");
    //         });
    // }
    const [showAddBook, setShowAddBook] = useState(false);

    const handleShowAddBook = () => setShowAddBook(!showAddBook);

    function handleAddBook() {
        // bookID = index;

        console.log("Add Book Interface");
        // TitleMod.value = "";
        // genreMod.value = "";
        // inventoryMod.value = "";
        // inventoryWantedMod.value = "";
        // priceMod.value = "";
        //editModButton.style.display = "none";
        //addModButton.style.display = "inline-block";

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
        </>
    );
}

//     async function sortBooks() {
//        sortedBooks = books.sort((a, b) => {
//             if (a.Title < b.Title) {
//                 console.log(a.Title + " is less than " + b.Title);
//                 return -1;
//             }
//         });
//     }
// const removeDuplicatesFromArrayByProperty = async (arr, prop) =>
//     arr.reduce((accumulator, currentValue) => {
//         if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
//             accumulator.push(currentValue);
//         }
//         return accumulator;
//     }, []);
//<Popup show={showAddBook} handleShow={handleShowAddBook} />;