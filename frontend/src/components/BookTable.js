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
//require('dotenv').config()

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
        return <BookRow key={index} book={book} index={index} />;
    });
}
//<Popup show={showAddBook} handleShow={handleShowAddBook} />;
