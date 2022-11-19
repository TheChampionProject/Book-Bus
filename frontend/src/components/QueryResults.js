import QueryRow from "./QueryRow.js";
export default function QueryResults({ queryList }) {
    return queryList.map((book, number) => {
        number++;
        return <QueryRow key={number} book={book} />;
    });
   
}
