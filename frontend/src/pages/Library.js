import React from "react";
import BookTable from "../components/BookTable.js";
import TableHeader from "../components/TableHeader.js";

export default function Library() {
    return (
        <>
            <TableHeader />
            <BookTable />
        </>
    );
}
