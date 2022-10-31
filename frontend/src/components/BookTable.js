import React from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { firebaseConfig } from "../keys.js";

import BookRow from "./BookRow.js";

export default function BookTable() {
    // Firebase Code
    initializeApp(firebaseConfig);
    const db = getDatabase();

    let [books, setBooks] = React.useState([]);

    const dbRef = ref(db, "/");
    onValue(dbRef, async (snapshot) => {
        books = []; // Everytime a book is edited or add, reset the books array and query the database again
        await snapshot.forEach((childSnapshot) => {
            books.push(childSnapshot.val());
        });
        setBooks(books);
    });


    //     btn.onclick = function () {
    //         // When the edit button is clicked, it will open the edit book popup
    //         //fillTBoxes(btn.id);
    //     };

    //     tableRow.appendChild(btn);
    //     //tbody.appendChild(tableRow);
    // }

    // // addModButton.onclick = function () {
    // //     // Inside of add book popup
    // //     addBook();
    // // };
    // // editModButton.onclick = function () {
    // //     // When you submit the edits from the popup
    // //     editBook();
    // // };
    // // addBookButton.onclick = function () {
    // //     // When you click the add book button from the home page
    // //     fillTBoxes(addBookButton.id);
    // // };

    // // async function fillTBoxes(index) {
    // //     bookID = index;
    // //     if (index === "AddBookButton") {
    // //         console.log("Add Book Interface");
    // //         titleMod.value = "";
    // //         genreMod.value = "";
    // //         inventoryMod.value = "";
    // //         inventoryWantedMod.value = "";
    // //         priceMod.value = "";
    // //         editModButton.style.display = "none";
    // //         addModButton.style.display = "inline-block";
    // //         popupTitle.innerHTML = "Add A Book";
    // //     } else {
    // //         console.log("index " + index);
    // //         titleMod.value = document.getElementById("title" + index).innerHTML;
    // //         genreMod.value = document.getElementById("genre" + index).innerHTML;
    // //         inventoryMod.value = document.getElementById(
    // //             "inventory" + index
    // //         ).innerHTML;
    // //         inventoryWantedMod.value = document.getElementById(
    // //             "inventoryWanted" + index
    // //         ).innerHTML;
    // //         priceMod.value = document
    // //             .getElementById("price" + index)
    // //             .innerHTML.substring(1);
    // //         editModButton.style.display = "inline-block";
    // //         addModButton.style.display = "none";
    // //         popupTitle.innerHTML = "Edit This Book";
    // //     }

    // //     document.getElementById("#ModalCenter").modal("show"); // Bring up the popup
    // // }

    // async function addToTable(book) {
    //     bookID = 0;
    //     //tbody.innerHTML = "";

    //     for (let i = 0; i < books.length; i++) {
    //         // Loop through all books that are in the database and add them to the table
    //         await addItemToTable(
    //             book[i].Title,
    //             book[i].Genre,
    //             book[i].Inventory,
    //             book[i].InventoryWanted,
    //             book[i].Price
    //         );
    //     }
    // }

    async function addBook() {
        set(ref(db, "/" + books.length), {
            // Title: titleMod.value, Need to pass in props
            // Genre: genreMod.value,
            // Inventory: inventoryMod.value,
            // InventoryWanted: inventoryWantedMod.value,
            // Price: priceMod.value,
        });
        // .then(() => {
        //     document.getElementById("#ModalCenter").modal("hide");
        // })
        // .catch((error) => {
        //     alert("Book failed to add");
        //     document.getElementById("#ModalCenter").modal("hide");
        // });
    }

    async function editBook() {
        // set(ref(db, "/" + bookID), {
        //     Title: titleMod.value,
        //     Genre: genreMod.value,
        //     Inventory: inventoryMod.value,
        //     InventoryWanted: inventoryWantedMod.value,
        //     Price: priceMod.value,
        // })
        //     .then(() => {
        //         document.getElementById("#ModalCenter").modal("hide");
        //     })
        //     .catch((error) => {
        //         alert("Book failed to edit");
        //         document.getElementById("#ModalCenter").modal("hide");
        //     });
    }
    // const [showAddBook, setShowAddBook] = useState(false);

    // const handleShowAddBook = () => setShowAddBook(!showAddBook);

    // function handleAddBook() {
    //     // bookID = index;

    //     console.log("Add Book Interface");
    //     // TitleMod.value = "";
    //     // genreMod.value = "";
    //     // inventoryMod.value = "";
    //     // inventoryWantedMod.value = "";
    //     // priceMod.value = "";
    //     //editModButton.style.display = "none";
    //     //addModButton.style.display = "inline-block";

    //     handleShowAddBook();
    // }

    return books.map((book, index) => {
        return <BookRow key={index} book={book} index={index}/>;
    });
}
//<Popup show={showAddBook} handleShow={handleShowAddBook} />;
