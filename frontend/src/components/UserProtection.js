import React, { useEffect } from "react";
import axios from "axios";
import { getSignedInUserNameFB } from "../FirebaseFunctions";

export default function UserProtection() {
    useEffect(() => {
        const getUsername = async () => {
            const response = await getSignedInUserNameFB();
            if (response.data === "No user signed in") {
                alert("You must be signed in to view this page");
                window.location = "/login"
            }
        };
        getUsername();
    }, []);
    return <></>;
}
