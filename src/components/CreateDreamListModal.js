import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, push as firebasePush, set as firebaseSet } from 'firebase/database';

function CreateDreamListModal(props) {
    const { show, onHide, currentUser } = props;
    const [listName, setListName] = useState("");

    const handleSave = () => {
        if (!currentUser) {
                alert("You must be logged in to create a dream list.");
                return;
        }
        if (!listName.trim()) {
            alert("Please enter a name for the dream list.");
            return;
        }
        const db = getDatabase();
        const newListRef = firebasePush(ref(db, `dreamLists/${currentUser.uid}`));
        firebaseSet(newListRef, { name: listName })
            .then(() => {
                onHide();
                setListName("");
            })
            .catch((error) => {
                console.log("Error creating new dream list:", error);
            });
    };

    const handleListNameChange = (event) => {
        setListName(event.target.value);
    }

    return (
        <Modal show={show} onHide={onHide} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Create New Dream List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Dream List Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter dream list name"
                            value={listName}
                            onChange={handleListNameChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} aria-label="Close modal">Close</Button>
                <Button variant="primary" onClick={handleSave} aria-label="Save new dream list">Save List</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateDreamListModal;
