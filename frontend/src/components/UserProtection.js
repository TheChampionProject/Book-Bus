import React, { useEffect } from "react";
import { auth } from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
export default function UserProtection() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        const getUsername = async () => {
            try {
                if (!loading && user === null) {
                    alert("You must be signed in to view this page");
                    navigate("/login");
                }
            } catch {
                alert("You must be signed in to view this page");
                navigate("/login");
            }
        };
        getUsername();
    }, []);
    return <></>;
}
