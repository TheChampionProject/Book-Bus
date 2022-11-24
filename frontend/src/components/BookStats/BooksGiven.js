import { useEffect } from "react";
import axios from "axios";

export default function BooksGiven() {
    let archivedBooks = [];

    // Load books from database on page load
    useEffect(() => {
        const callGetBooks = async () => {
            await getBooks();
        };
        callGetBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBooks = async () => {
        let res = [];
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "getAllBooks")
            .then((response) => {
                res.push(response.data[0]); // response.data[0] is the JSON object full of books

                for (let j in res[0].archive)
                    archivedBooks.push(res[0].archive[j]); // In order to turn a giant JSON full of books into an array of books

                findGiftDates();
            });
    };

    const findGiftDates = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        let giftDatesThisMonth = [];
        let giftDatesThisYear = [];
        let giftDatesAllTime = [];

        for (let i = 0; i < archivedBooks.length; i++) {
            for (let j = 0; j < archivedBooks[i].ArchiveDates; j++) {
                if (
                    new Date(archivedBooks[i].ArchiveDates[j]).getMonth() ===
                    currentMonth
                ) {
                    console.log("wow");
                }
            }
            let giftDate = new Date(archivedBooks[i].ArchiveDates);

            if (giftDate.getMonth() === currentMonth) {
                giftDatesThisMonth.push(archivedBooks);
            }

            if (giftDate.getFullYear() === currentYear) {
                giftDatesThisYear.push(archivedBooks);
            }

            giftDatesAllTime.push(archivedBooks);

        }

        console.log(giftDatesThisMonth);
        console.log(giftDatesThisYear);
        console.log(giftDatesAllTime);

    };

    return;
}
