import { Modal, Button } from "react-bootstrap";
import React from "react";

export default function GiftConfirmation({
    showGC,
    setShowGC,
    book,
    setManagedBook,
}) {
    const confirmGC = (e) => {
        e.preventDefault();
        setManagedBook({ ...book, Inventory: --book.Inventory });
        setShowGC(false);
    };

    let info = "";

    try {
        info = book.Title === null ? "error" : book.Title;
    } catch {
        info = "error";
    }

    return (
        <>
            <Modal show={showGC} onHide={() => setShowGC(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Gift?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Would you like to gift {info}?</h4>
                    <Button
                        variant="secondary"
                        className="btn btn-danger GiftButtons"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowGC(false);
                        }}
                    >
                        X Cancel
                    </Button>
                    <Button
                        variant="secondary"
                        className="btn btn-success GiftButtons"
                        type="submit"
                        onClick={(e) => {
                            confirmGC(e);
                        }}
                    >
                        ✓ Gift
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
