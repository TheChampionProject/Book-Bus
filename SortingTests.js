let data = [
    {
        Genre: "Laugh (Red)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 6.99,
        Title: "1, 2, 3… By the sea",
    },
    {
        "Amazon link": "",
        Genre: "Solve (Black)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 6.99,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 15:49:25",
        Title: "100 Days of Cool",
    },
    {
        Genre: "Laugh (Red)",
        Inventory: "0",
        InventoryWanted: 3,
        Price: 8.48,
        Title: "5 Minute Marvel Stories",
    },
    {
        "Amazon link": "",
        Genre: "Be Inspired (Blue)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 19.95,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 15:58:28",
        Title: "5,000 Awesome Facts (About Everything)",
    },
    {
        Genre: "Solve (Black)",
        Inventory: "0",
        InventoryWanted: 3,
        Price: 16.95,
        Title: "642 Things To Color",
    },
    {
        "Amazon link": "",
        Genre: "Explore (White)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 5.99,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 16:03:34",
        Title: "A Bear Called Paddington",
    },
    {
        "Amazon link": "",
        Genre: "Laugh (Red)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 4.99,
        "Sub-Genre": "C-Laugh/Cartoon (Red)",
        Timestamp: "10/16/2022 15:44:06",
        Title: "zebra A Pig, A Fox, and Stinky Socks",
    },
    {
        "Amazon link": "",
        Genre: "Explore (White)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 5,
        "Sub-Genre": "F - Explore/Fantasy (White)",
        Timestamp: "10/16/2022 15:50:11",
        Title: "john Royal Visit (Frozen)",
    },
    {
        Genre: "Explore (White)",
        Inventory: "0",
        InventoryWanted: 3,
        Price: 12.99,
        Title: "Allegiant",
    },
    {
        "Amazon link": "",
        Genre: "Explore (White)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 12.99,
        "Sub-Genre": "F - Explore/Fantasy (White)",
        Timestamp: "10/20/2022 18:26:26",
        Title: "Allegiant - book 3",
    },
    {
        "Amazon link": "",
        Genre: "Laugh (Red)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 4.99,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 15:50:29",
        Title: "Animal Joke Book",
    },
    {
        "Amazon link": "",
        Genre: "Laugh (Red)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 1,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 15:47:07",
        Title: "Animal Kids Cubs, Chicks, and Pups",
    },
    {
        "Amazon link": "",
        Genre: "Solve (Black)",
        Inventory: 1,
        InventoryWanted: 3,
        Price: 5.99,
        "Sub-Genre": "",
        Timestamp: "10/16/2022 15:55:36",
        Title: "Animals on Board",
    },
    {
        Genre: "Laugh (Red)",
        Inventory: "0",
        InventoryWanted: 3,
        Price: 17.99,
        Title: "Are You A Cheeseburger?",
    },

    {
        Genre: "",
        Inventory: "",
        InventoryWanted: "",
        Price: "",
        Title: "A cool book",
    },
];

//console.log(data);

const sort_by = (field, reverse, primer) => {
    const key = primer
        ? function (x) {
              return primer(x[field]);
          }
        : function (x) {
              return x[field];
          };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
};

let places = [
    {
        city: "Los Angeles",
        country: "USA",
    },
    {
        city: "Boston",
        country: "USA",
    },
    {
        city: "Chicago",
        country: "USA",
    },
];

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
}

places.sort(function (a, b) {
    return compareStrings(a.city, b.city);
});

data.sort(function (a, b) {
    return compareStrings(a.Title, b.Title);
});

//console.log(places);
console.log(data);
