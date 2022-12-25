import React, { useEffect } from "react";
import axios from "axios";

export default function UserProtection() {
    useEffect(() => {
        const getUsername = async () => {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + "getSignedInUserName"
            );
            if (response.data === "No user signed in") {
                alert("You must be signed in to view this page");
                window.location = "/login"
            }
        };
        getUsername();
    }, []);
    return <></>;
}
