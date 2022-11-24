import QueryRow from "./QueryRow.js";
export default function QueryResults({
    queryList,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
}) {
    if (queryList.length === 0) return;
    return queryList.map((book, number) => {
        number++;
        return (
            <QueryRow
                key={number}
                book={book}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setShowEditPopup={setShowEditPopup}
                setAlert={setAlert}
            />
        );
    });
}
