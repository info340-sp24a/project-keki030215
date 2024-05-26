import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


export function EditDreamModal({ show, onHide, dream, onSave }) {

    const [editedDream, setEditedDream] = useState({
        title: dream.title || "",
        entry: dream.entry || "",
        dreamType: dream.dreamType || "normal",
        tags: dream.tags || [],
        image: dream.image || null,
        id: dream.id || null
    });

    useEffect(() => {
        setEditedDream({
            title: dream.title || "",
            entry: dream.entry || "",
            dreamType: dream.dreamType || "normal",
            tags: dream.tags || [],
            image: dream.image || null,
            id: dream.id || null
        });
    }, [dream]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedDream((prev) => (
            { ...prev, [name]: value }
        ));
    };

    const handleTagChange = (event) => {
        setEditedDream((prev) => (
            { ...prev, tags: event.target.value.split(',').map(tag => tag.trim()) }
        ));
    };   

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const storage = getStorage();
            const imageRef = storageRef(storage, `dream-diary-imgs/${file.name}`);
            uploadBytes(imageRef, file)
            .then( () => {
                return getDownloadURL(imageRef);
            })
            .then((downloadURL) => {
                setEditedDream((prev) => ({ ...prev, image: downloadURL }));
                console.log("Image uploaded and URL is:", downloadURL);
            })
        }
    };

    const handleSaveClick = () => {
        console.log("Saving these tags to Firebase:", editedDream.tags);
        if (!editedDream.image) {
            editedDream.image = "img/no-img-dream.jpeg";
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
                                    <option value="normal">Normal</option>
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
                                {editedDream.image && 
                                <img src={editedDream.image} 
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
