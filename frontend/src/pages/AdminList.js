import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    getSignedInUserInfoFB,
    getAllUsersFB,
    updateUserAdminFB
} from "../FirebaseFunctions";
import { Button } from "react-bootstrap";

export default function VerifyList() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        const ensureAdmin = async () => {
            try {
                if (!loading && user === null) {
                    alert("You must be signed in to view this page");
                    navigate("/login");
                } else {
                    const response = await getSignedInUserInfoFB(user.uid);

                    if (response === "No user signed in") {
                        alert("You must be signed in to view this page");
                        navigate("/login");
                    }

                    if (!response.admin) {
                        alert("You must be an admin to view this page");
                        navigate("/home");
                    }
                }
            } catch {
                alert("You must be signed in to view this page");
                navigate("/login");
            }

            setAllUserData(await getAllUsersFB());
        };
        ensureAdmin();
    }, []);

    const tryToCheck = async (data, checked) => {
        await updateUserAdminFB(data, checked);
        console.log("trying to check")
    };

    return (
        <>
            <div
                className="fixed-top navbar NavHead"
                style={{ textAlign: "center" }}
            >
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
                style={{
                    display: "grid",
                    justifyContent: "center",
                    marginTop: "5em",
                }}
            >
                <h4>Admin</h4>
                {allUserData.map((data, number) => (
                    <div key={number} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={data.admin}
                            onChange={(e) => tryToCheck(data, e.target.checked)}
                        ></input>
                        <label className="form-check-label">{data.name}</label>
                    </div>
                ))}
            </div>

        </>
    );
}
