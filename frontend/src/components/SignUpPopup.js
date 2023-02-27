import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import VolunteerDates from "./VolunteerDates";
import {
    getSignedInUserInfoFB,
    updateVolunteerDateFB,
} from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseFunctions";
export default function GiftConfirmation({
    showSignUpPopup,
    setShowSignUpPopup,

    fullUserName,
}) {
    const [selectedDateIDs, setSelectedDateIDs] = useState([]);
    const [unselectedDateIDs, setUnselectedDateIDs] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [user] = useAuthState(auth);

    const submit = async (e) => {
        e.preventDefault();

        const info = await getSignedInUserInfoFB(user.uid);

        if (!info.watchedVideo || !info.uploadedForm) {
            alert(
                "You must watch the video and upload the form before signing up for a date!"
            );
            return;
        }

        for (let i = 0; i < selectedDateIDs.length; i++) {
            let fbRequest = await updateVolunteerDateFB(
                selectedDateIDs[i],
                fullUserName,
                true
            );
            if (fbRequest === "failure") {
                alert("Error!");
            }
        }

        for (let i = 0; i < unselectedDateIDs.length; i++) {
            let fbRequest = await updateVolunteerDateFB(
                selectedDateIDs[i],
                fullUserName,
                false
            );
            if (fbRequest === "failure") {
                alert("Error!");
            }
        }

        //let request = "Error";
        //try {
        //    request = await changeDateFB(selectedDateIDs, unselectedDateIDs);
        //} catch {
        //    alert("There was an error with your request");
        //}

        //if (request.data === "User already Signed Up")
        //    alert("You are already signed up for this date");
        //else if (request.data === "No date found with that ID.")
        //    alert("There was an error with your request");
        //else if (request.data === "No user signed in")
        //    alert("You must be signed in to sign up for a date");
        //else if (request.data === "success") alert("Successfully signed up!");
    };

    return (
        <>
            <Modal
                show={showSignUpPopup}
                onHide={() => setShowSignUpPopup(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Dates to Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <VolunteerDates
                        availableDates={availableDates}
                        setAvailableDates={setAvailableDates}
                        setSelectedDateIDs={setSelectedDateIDs}
                        selectedDateIDs={selectedDateIDs}
                        fullUserName={fullUserName}
                        setUnselectedDateIDs={setUnselectedDateIDs}
                        unselectedDateIDs={unselectedDateIDs}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            marginLeft: "auto",
                            
                        }}
                    >
                        <Button
                            variant="secondary"
                            className="btn btn-danger"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowSignUpPopup(false);
                            }}
                        >
                            X Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                submit(e);
                            }}
                            style={{ marginLeft: "1em" }}
                        >
                            ✓ Confirm
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
