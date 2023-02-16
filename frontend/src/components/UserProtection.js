import React, { useEffect } from "react";
import { auth } from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
export default function UserProtection() {
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        const getUsername = async () => {
            if (user === null && !loading) {
                alert("You must be signed in to view this page");
                window.location = "/login";
            }
        };
        getUsername();
    }, [user]);
    return <></>;
}
