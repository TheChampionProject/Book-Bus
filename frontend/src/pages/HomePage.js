import { useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function HomePage() {
    useEffect(() => {
        const getDates = async () => {
            const dates = await fetch(
                process.env.REACT_APP_BACKEND_URL + "getDates"
            )
                .then((response) => response.json())
                .then((data) => console.log(data));
        };
        getDates();
    }, []);
    return (
        <>
            <div className="CenterHomePage">
                <h1>Thank you for volunteering for the Champion Project!</h1>
                <br />
                <h2>Chose a page to go to: </h2>
                <br />
                <Button variant="primary" href="/manage">
                    Manage the book database
                </Button>
                <br />
                <br />
                <Button variant="primary" href="/gift">
                    Gift books
                </Button>
                <br />
                <br />
                <Button variant="primary" href="/stats">
                    View statistics
                </Button>
                <br />
                <br />
                <br />
                <h2>Or select a date to volunteer: </h2>
                <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
            </div>
        </>
    );
}
