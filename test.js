import Fuse from "fuse.js";

let books = [
    {
        item: {
            Title: "soccer analytics",
            Genre: "Solve (Black)",
            Inventory: 1,
            Price: 22.95,
            Needed: 0,
            Index: 404,
        },
        refIndex: 343,
    },
    {
        item: {
            Title: "A Pig, A Fox, and Stinky Socks",
            Genre: "Laugh (Red)",
            Inventory: 1,
            Price: 4.99,
            Needed: 0,
            Index: 6,
        },
        refIndex: 10,
    },
];

const book = {
    Title: "Wreck This Journal",
    Genre: "Solve (Black)",
    Inventory: 1,
    Price: 15,
    Needed: 0,
    Index: 274,
};

const searchOptions = {
    keys: ["item.Title"],
    minMatchCharLength: 3,
    threshold: 0.3,
};

let searchArray = new Fuse(books, searchOptions);
// eslint-disable-next-line react-hooks/exhaustive-deps
let searchResult = searchArray.search("soccer");
console.log(searchResult);
