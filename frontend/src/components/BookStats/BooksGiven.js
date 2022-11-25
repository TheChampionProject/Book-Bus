import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

export default function BooksGiven() {
    let archivedBooks = [];

    const [giftDatesThisMonth, setGiftDatesThisMonth] = useState([]);
    const [giftDatesThisYear, setGiftDatesThisYear] = useState([]);
    const [giftDatesAllTime, setGiftDatesAllTime] = useState([]);

    // Load books from database on page load
    useEffect(() => {
        const callGetBooks = async () => {
            await getBooks();
        };
        callGetBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBooks = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "getAllBooks")
            .then(async (response) => {
                archivedBooks = response.data[0].archive;
                await findGiftDates();
            });
    };

    const findGiftDates = async () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < archivedBooks.length; i++) {
            const archivedBook = archivedBooks[i];
            for (let j = 0; j < archivedBook.ArchiveDates.length; j++) {
                let giftDate = new Date(archivedBook.ArchiveDates[j]);

                if (giftDate.getMonth() === currentMonth) {
                    setGiftDatesThisMonth((giftDatesThisMonth) => [
                        ...giftDatesThisMonth,
                        archivedBook,
                    ]);
                }

                if (giftDate.getFullYear() === currentYear) {
                    setGiftDatesThisYear((giftDatesThisYear) => [
                        ...giftDatesThisYear,
                        archivedBook,
                    ]);
                }

                setGiftDatesAllTime((giftDatesAllTime) => [
                    ...giftDatesAllTime,
                    archivedBook,
                ]);
            }
        }

        console.log(giftDatesThisMonth);
    };

    return (
        <>
            <div className="BookStats">
                <p>Books Given This Month</p>
                <p style={{ fontWeight: "bold", textSize: "36px" }}>
                    {giftDatesThisMonth.length}
                </p>
            </div>
            <div className="BookStats">
                <p>Books Given This Year</p>
                <p style={{ fontWeight: "bold", textSize: "36px" }}>
                    {giftDatesThisYear.length}
                </p>
            </div>
            <div className="BookStats">
                <p>Books Given All Time</p>
                <p style={{ fontWeight: "bold", textSize: "36px" }}>
                    {giftDatesAllTime.length}
                </p>
            </div>
        </>
    );
}
