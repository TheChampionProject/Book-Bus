import { useEffect, useState } from "react";
import "../App.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import StatYearDD from "../components/StatYearDD";
import { getBooksFB } from "../FirebaseFunctions";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function StatsPage() {
  let archivedBooks = [];
  let activeBooks = [];
  let volunteerDates = [];
  let [thisMonthGifted, setThisMonthGifted] = useState([]);
  let [thisYearGifted, setThisYearGifted] = useState([]);
  let [allTimeGifted, setAllTimeGifted] = useState([]);

  let [thisMonthGiftedValue, setThisMonthGiftedValue] = useState(0);
  let [thisYearGiftedValue, setThisYearGiftedValue] = useState(0);
  let [allTimeGiftedValue, setAllTimeGiftedValue] = useState(0);

  let [thisMonthRecieved, setThisMonthRecieved] = useState([]);
  let [thisYearRecieved, setThisYearRecieved] = useState([]);
  let [allTimeRecieved, setAllTimeRecieved] = useState([]);

  let [thisMonthRecievedValue, setThisMonthRecievedValue] = useState(0);
  let [thisYearRecievedValue, setThisYearRecievedValue] = useState(0);
  let [allTimeRecievedValue, setAllTimeRecievedValue] = useState(0);

  let [numEventsThisMonth, setNumEventsThisMonth] = useState(0);
  let [numEventsThisYear, setNumEventsThisYear] = useState(0);
  let [numEventsAllTime, setNumEventsAllTime] = useState(0);

  let [currentInventory, setCurrentInventory] = useState([]);

  let [numExplore, setNumExplore] = useState(0);
  let [numSolve, setNumSolve] = useState(0);
  let [numLaugh, setNumLaugh] = useState(0);
  let [numInspire, setNumInspire] = useState(0);

  let [statsYear, setStatsYear] = useState(new Date().getFullYear());
  let [processOldStats, setProcessOldStats] = useState(false);

  const navigate = useNavigate();
  // Load books from database on page load
  useEffect(() => {
    const callGetBooks = async () => {
      await getBooks();
    };
    callGetBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsYear]);

  const getBooks = async () => {
    const books = await getBooksFB();
    archivedBooks = books[0].archive;
    activeBooks = books[0].active;
    volunteerDates = books[0]["volunteer-dates"];

    await processStats();
  };

  const processStats = async () => {
    const currentMonth = new Date().getMonth();
    let year = new Date().getFullYear();

    thisMonthGifted = [];
    thisYearGifted = [];
    allTimeGifted = [];
    thisMonthRecieved = [];
    thisYearRecieved = [];
    allTimeRecieved = [];
    thisMonthGiftedValue = 0;
    thisYearGiftedValue = 0;
    allTimeGiftedValue = 0;
    thisMonthRecievedValue = 0;
    thisYearRecievedValue = 0;
    allTimeRecievedValue = 0;
    currentInventory = [];
    numExplore = 0;
    numSolve = 0;
    numLaugh = 0;
    numInspire = 0;
    numEventsThisMonth = 0;
    numEventsThisYear = 0;
    numEventsAllTime = 0;

    processOldStats = statsYear !== year;
    if (processOldStats) year = statsYear;

    for (let i in archivedBooks) {
      const archivedBook = archivedBooks[i];
      for (let j = 0; j < archivedBook.ArchiveDates.length; j++) {
        let giftDate = new Date(archivedBook.ArchiveDates[j]);

        if (!processOldStats && giftDate.getMonth() === currentMonth) {
          thisMonthGifted.push(archivedBook);
          thisMonthGiftedValue += parseFloat(archivedBook.Price);
        }

        if (giftDate.getFullYear() === year) {
          thisYearGifted.push(archivedBook);
          thisYearGiftedValue += parseFloat(archivedBook.Price);
        }

        allTimeGifted.push(archivedBook);
        allTimeGiftedValue += parseFloat(archivedBook.Price);

        if (archivedBook.Genre.includes("Explore")) numExplore++;
        else if (archivedBook.Genre.includes("Solve")) numSolve++;
        else if (archivedBook.Genre.includes("Laugh")) numLaugh++;
        else if (archivedBook.Genre.includes("Inspire")) numInspire++;
      }
    }

    for (let i in activeBooks) {
      const activeBook = activeBooks[i];

      if (activeBook.AddDates) {
        for (let j = 0; j < activeBook.AddDates.length; j++) {
          let recievedDate = new Date(activeBook.AddDates[j]);

          if (!processOldStats && recievedDate.getMonth() === currentMonth) {
            thisMonthRecieved.push(activeBook);
            thisMonthRecievedValue += parseFloat(activeBook.Price);
          }

          if (recievedDate.getFullYear() === year) {
            thisYearRecieved.push(activeBook);
            thisYearRecievedValue += parseFloat(activeBook.Price);

            if (activeBook.Price > 50) {
              console.log(activeBook);
            }
          }

          allTimeRecieved.push(activeBook);
          allTimeRecievedValue += parseFloat(activeBook.Price);
        }
      }

      for (let j = 0; j < activeBook.Inventory; j++) {
        currentInventory.push(activeBook);
      }
    }

    for (let k in volunteerDates) {
      if (new Date(volunteerDates[k].startDate).getFullYear() === year) {
        numEventsThisYear++;
      }

      if (
        !processOldStats &&
        new Date(volunteerDates[k].startDate).getMonth() === currentMonth
      ) {
        numEventsThisMonth++;
      }

      numEventsAllTime++;
    }

    setCurrentInventory(currentInventory);

    setThisMonthGifted(thisMonthGifted);
    setThisYearGifted(thisYearGifted);
    setAllTimeGifted(allTimeGifted);

    setThisMonthGiftedValue(thisMonthGiftedValue);
    setThisYearGiftedValue(thisYearGiftedValue);
    setAllTimeGiftedValue(allTimeGiftedValue);

    setThisMonthRecieved(thisMonthRecieved);
    setThisYearRecieved(thisYearRecieved);
    setAllTimeRecieved(allTimeRecieved);

    setThisMonthRecievedValue(thisMonthRecievedValue + "");
    setThisYearRecievedValue(thisYearRecievedValue + "");
    setAllTimeRecievedValue(allTimeRecievedValue + "");

    setNumEventsAllTime(numEventsAllTime);
    setNumEventsThisYear(numEventsThisYear);
    setNumEventsThisMonth(numEventsThisMonth);

    setThisMonthRecievedValue(
      Math.round(
        String(thisMonthRecievedValue).substring(
          0,
          String(thisMonthRecievedValue).indexOf(".")
        )
      ) + ""
    );

    setThisYearRecievedValue(
      Math.round(
        String(thisYearRecievedValue).substring(
          0,
          String(thisYearRecievedValue).indexOf(".")
        )
      ) + ""
    );

    setAllTimeRecievedValue(
      Math.round(
        String(allTimeRecievedValue).substring(
          0,
          String(allTimeRecievedValue).indexOf(".")
        )
      ) + ""
    );

    setNumExplore(numExplore);
    setNumSolve(numSolve);
    setNumLaugh(numLaugh);
    setNumInspire(numInspire);

    setProcessOldStats(processOldStats);
  };

  let booksGiftedThisMonth,
    booksRecievedThisMonth,
    amountGiftedThisMonth,
    amountRecievedThisMonth,
    numEventsThisMonthHTML;

  if (!processOldStats) {
    booksGiftedThisMonth = (
      <div className="Statistic">
        <p className="StatText">{thisMonthGifted.length}</p>
        <p className="StatDescription">Books Gifted (This Month)</p>
      </div>
    );
    booksRecievedThisMonth = (
      <div className="Statistic">
        <p className="StatText">{thisMonthRecieved.length}</p>
        <p className="StatDescription">Books Recieved (This Month)</p>
      </div>
    );
    amountGiftedThisMonth = (
      <div className="Statistic">
        <p className="StatText">${Math.round(thisMonthGiftedValue)}</p>
        <p className="StatDescription">Amount Gifted (This Month)</p>
      </div>
    );
    amountRecievedThisMonth = (
      <div className="Statistic">
        <p className="StatText">${thisMonthRecievedValue}</p>
        <p className="StatDescription">Recieved Donations Value (This Month)</p>
      </div>
    );
    numEventsThisMonthHTML = (
      <div className="Statistic">
        <p className="StatText">{numEventsThisMonth}</p>
        <p className="StatDescription"># of BookBus Events (This Month)</p>
      </div>
    );
  } else {
    booksGiftedThisMonth = <></>;
    booksRecievedThisMonth = <></>;
    amountGiftedThisMonth = <></>;
    amountRecievedThisMonth = <></>;
    numEventsThisMonthHTML = <></>;
  }

  return (
    <>
      <div className="fixed-top navbar NavHead" style={{ textAlign: "center" }}>
        <Button
          variant="primary"
          onClick={() => navigate("/home")}
          style={{ position: "absolute", top: "20%", left: "1%" }}
        >
          Home
        </Button>
        <h2 style={{}} className="CPStyleFull">
          The Champion Project
        </h2>
        <h2 style={{}} className="CPStyleMobile">
          TCP
        </h2>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5em" }}
      >
        <label style={{ fontWeight: "bold", marginRight: "1em" }}>
          Select Year For Statistics:
        </label>
        <Dropdown>
          <Dropdown.Toggle variant="primary" className="StatsDropdown">
            {statsYear}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <StatYearDD setStatsYear={setStatsYear} />
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="StatsArea">
        {/* {thisYearGifted} */}
        <div className="Statistic">
          <p className="StatText">{thisYearGifted.length}</p>
          <p className="StatDescription">Books Gifted (This Year)</p>
        </div>

        <div className="Statistic">
          <p className="StatText">{allTimeGifted.length}</p>
          <p className="StatDescription">Books Gifted (All Time)</p>
        </div>
        {amountGiftedThisMonth}

        <div className="Statistic">
          <p className="StatText">
            $
            {isNaN(Math.round(thisYearGiftedValue))
              ? 0
              : Math.round(thisYearGiftedValue)}
          </p>
          <p className="StatDescription">Amount Gifted (This Year)</p>
        </div>
        <div className="Statistic">
          <p className="StatText">
            $
            {isNaN(Math.round(allTimeGiftedValue))
              ? 0
              : Math.round(allTimeGiftedValue)}
          </p>
          <p className="StatDescription">Amount Gifted (All Time)</p>
        </div>

        {/* <div className="Statistic">
          <p className="StatText"> {booksRecievedThisMonth}</p>
          <p className="StatDescription">Books Recieved (This Month)</p>
        </div> */}

        <div className="Statistic">
          <p className="StatText">{thisYearRecieved.length}</p>
          <p className="StatDescription">Books Recieved (This Year)</p>
        </div>
        <div className="Statistic">
          <p className="StatText">{allTimeRecieved.length}</p>
          <p className="StatDescription">Books Recieved (All Time)</p>
        </div>

        <div className="Statistic">
          <p className="StatText">${thisYearRecievedValue}</p>
          <p className="StatDescription">
            Recieved Donations Value (This Year)
          </p>
        </div>

        <div className="Statistic">
          <p className="StatText">${allTimeRecievedValue}</p>
          <p className="StatDescription">Recieved Donations Value (All Time)</p>
        </div>

        <div className="Statistic">
          <p className="StatText">{currentInventory.length}</p>
          <p className="StatDescription">Current Inventory</p>
        </div>

        <div className="Statistic">
          <p className="StatText">{numEventsThisYear}</p>
          <p className="StatDescription"># of BookBus Events (This Year)</p>
        </div>

        <div className="Statistic">
          <p className="StatText">{numEventsAllTime}</p>
          <p className="StatDescription"># of BookBus Events (All Time)</p>
        </div>

        {numEventsThisMonthHTML}

        <div className="Statistic">
          <p className="StatText">{numInspire}</p>
          <p className="StatDescription"># of Be Inspired Gifted (All Time)</p>
        </div>
        <div className="Statistic">
          <p className="StatText">{numLaugh}</p>
          <p className="StatDescription"># of Laugh Gifted (All Time)</p>
        </div>
        <div className="Statistic">
          <p className="StatText">{numExplore}</p>
          <p className="StatDescription"># of Explore Gifted (All Time)</p>
        </div>
        <div className="Statistic">
          <p className="StatText">{numSolve}</p>
          <p className="StatDescription"># of Solve Gifted (All Time)</p>
        </div>
      </div>
    </>
  );
}
