import React, { useEffect } from "react";
import { getSignedInUserNameFB } from "../FirebaseFunctions";
import { auth } from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
export default function UserProtection() {
    const [user] = useAuthState(auth);
    useEffect(() => {
        const getUsername = async () => {
            if (!user) {
                alert("You must be signed in to view this page");
                window.location = "/login";
            }
        };
        getUsername();
    }, []);
    return <></>;
}
