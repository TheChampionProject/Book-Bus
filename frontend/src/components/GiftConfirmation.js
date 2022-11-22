import { Modal, Button } from "react-bootstrap";

export default function GiftConfirmation({
    showGC,
    setShowGC,
    book,
    setManagedBook,
}) {
    const confirmGC = (e) => {
        e.preventDefault();
        book.Inventory = Math.max(0, book.Inventory - 1);
        setManagedBook(book);
        setShowGC(false);
    };

    try {
        if (book === null) return;
    } catch {}
    return (
        <>
            <Modal show={showGC} onHide={() => setShowGC(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Gift?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>Would you like to gift {book.Title}?</h3>
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
