import Modal from "@base/components/common/modals/Modal";
import React from "react";

const Cmodal = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Default</h5>
                <div>
                    <button className="btn btn-primary" onClick={() => setOpen(true)}>
                        Open Modal
                    </button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Modal.Header>Modal Header</Modal.Header>
                        <Modal.Body>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                className="btn btn-primary"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Cmodal;
