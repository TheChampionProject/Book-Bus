import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function BooksGiven() {
    let archivedBooks = [];

    const [giftDatesThisMonth, setGiftDatesThisMonth] = useState([]);
    const [giftDatesThisYear, setGiftDatesThisYear] = useState([]);
    const [giftDatesAllTime, setGiftDatesAllTime] = useState([]);

    const [thisMonthValue, setThisMonthValue] = useState(0);
    const [thisYearValue, setThisYearValue] = useState(0);
    const [allTimeValue, setAllTimeValue] = useState(0);

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

        const giftDatesThisMonth = [],
            giftDatesThisYear = [],
            giftDatesAllTime = [];

        const amountGivenThisMonth = [],
            amountGivenThisYear = [],
            amountGivenAllTime = [];

        for (let i in archivedBooks) {
            const archivedBook = archivedBooks[i];
            for (let j = 0; j < archivedBook.ArchiveDates.length; j++) {
                let giftDate = new Date(archivedBook.ArchiveDates[j]);

                if (giftDate.getMonth() === currentMonth) {
                    giftDatesThisMonth.push(archivedBook);
                    amountGivenThisMonth.push(archivedBook.Price);
                }

                if (giftDate.getFullYear() === currentYear) {
                    giftDatesThisYear.push(archivedBook);
                    amountGivenThisYear.push(archivedBook.Price);
                }

                giftDatesAllTime.push(archivedBook);
                amountGivenAllTime.push(archivedBook.Price);
            }
        }

        setGiftDatesThisMonth(giftDatesThisMonth);
        setGiftDatesThisYear(giftDatesThisYear);
        setGiftDatesAllTime(giftDatesAllTime);

        setThisMonthValue(
            giftDatesThisMonth.reduce((partialSum, a) => partialSum + a, 0)
        );
        setThisYearValue(
            giftDatesThisYear.reduce((partialSum, a) => partialSum + a, 0)
        );
        setAllTimeValue(
            giftDatesAllTime.reduce((partialSum, a) => partialSum + a, 0)
        );
    };

    return (
        <div className="StatsArea">
            <div className="Statistic">
                <p className="StatText">{giftDatesThisMonth.length}</p>
                <p className="StatDescription">Books Gifted (This Month)</p>
            </div>

            <div className="Statistic">
                <p className="StatText">{giftDatesThisYear.length}</p>
                <p className="StatDescription">Books Gifted (This Year)</p>
            </div>

            <div className="Statistic">
                <p className="StatText">{giftDatesAllTime.length}</p>
                <p className="StatDescription">Books Gifted (All Time)</p>
            </div>

            <div className="Statistic">
                <p className="StatText">${thisMonthValue.length}</p>
                <p className="StatDescription">Amount Gifted (This Month)</p>
            </div>
            <div className="Statistic">
                <p className="StatText">${thisYearValue.length}</p>
                <p className="StatDescription">Amount Gifted (This Year)</p>
            </div>
            <div className="Statistic">
                <p className="StatText">${allTimeValue.length}</p>
                <p className="StatDescription">Amount Gifted (All Time)</p>
            </div>
        </div>
    );
}
