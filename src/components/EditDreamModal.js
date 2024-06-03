import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


export function EditDreamModal(props) {
    const { currentUser, show, onHide, dreamId, onSave } = props;

    const [editedDream, setEditedDream] = useState({
        title: "",
        entry: "",
        dreamType: "normal",
        tags: [],
        img: "img/no-img-dream.jpeg",
        id: dreamId
    });
    

    useEffect(() => {
        if (show && dreamId && currentUser) {
            const db = getDatabase();
            const dreamRef = ref(db, `dreams/${currentUser.uid}/${dreamId}`);
            onValue(dreamRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setEditedDream({
                        id: dreamId,
                        title: data.title || "",
                        entry: data.entry || "",
                        dreamType: data.dreamType || "normal",
                        tags: data.tags || [],
                        img: data.img || "img/no-img-dream.jpeg",
                    });
                }
            }, {
                onlyOnce: true
            });
    }
}, [show, dreamId, currentUser]);

    function handleChange(event) {
        const { name, value } = event.target;
        setEditedDream((prev) => {
            return { ...prev, [name]: value }
        });
    };

    function handleTagChange(event) {
        setEditedDream((prev) => {
            return { ...prev, tags: event.target.value.split(',').map(tag => tag.trim()) }
        });
    };   

    function handleImageChange(event) {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const storage = getStorage();
            const imageRef = storageRef(storage, `dream-diary-imgs/${file.name}`);
            uploadBytes(imageRef, file)
            .then(() => {
                return getDownloadURL(imageRef);
            })
            .then((downloadURL) => {
                setEditedDream((prev) => {
                    return { ...prev, img: downloadURL }
                });
                console.log("Image uploaded and URL is:", downloadURL);
            })
        }
    };

    function handleSaveClick() {
        if (!currentUser) {
            alert("You are not signed in, your dream CANNOT save permenantly :-(");
            return;
        }
        if (!editedDream.img) {
            editedDream.img = "img/no-img-dream.jpeg";
        }
        onSave(editedDream);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Edit New Dream</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-dark">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter dream title"
                                    name="title"
                                    value={editedDream.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-dark">Entry</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="entry"
                                    value={editedDream.entry}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-dark">Dream Type</Form.Label>
                                <Form.Select
                                    name="dreamType"
                                    value={editedDream.dreamType}
                                    onChange={handleChange}
                                >
                                    <option value="normal">Normal Dream</option>
                                    <option value="nightmare">Nightmare</option>
                                    <option value="lucid">Lucid</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label className="text-dark">Tags (comma separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter tags"
                                    name="tags"
                                    value={editedDream.tags.join(', ')}
                                    onChange={handleTagChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-dark">Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                {editedDream.img && 
                                <img src={editedDream.img} 
                                alt="Dream" 
                                style={{ width: '100%', marginTop: '10px' }} />}
                            </Form.Group>
                        </Form>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} aria-label="Close modal">Close</Button>
                <Button variant="primary" onClick={handleSaveClick} aria-label="Save changes">Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}
