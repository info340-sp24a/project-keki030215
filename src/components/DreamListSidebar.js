import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update as firebaseUpdate } from 'firebase/database';
import { Accordion, Button, Modal, ListGroup } from 'react-bootstrap';
import CreateDreamListModal from './CreateDreamListModal';

function DreamListSidebar(props) {
    const { currentUser } = props;
    const [dreamLists, setDreamLists] = useState([]);
    const [allDreams, setAllDreams] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [addDreamModalShow, setAddDreamModalShow] = useState(false);
    const [currentListId, setCurrentListId] = useState(null);
    const [filteredListId, setFilteredListId] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const dreamsRef = ref(db, `dreams/${currentUser.uid}`);
            onValue(dreamsRef, (snapshot) => {
                const dreams = snapshot.val() || {};
                const dreamsMap = {};
                Object.entries(dreams).forEach(([id, details]) => {
                    dreamsMap[id] = { id, ...details };
                });
                setAllDreams(dreamsMap);
            });
        }
    }, [currentUser]);


    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const listsRef = ref(db, `dreamLists/${currentUser.uid}`);
            onValue(listsRef, (snapshot) => {
                const lists = snapshot.val() || {};
                setDreamLists(Object.entries(lists).map(([id, details]) => ({
                    id,
                    ...details,
                    dreams: details.dreams || [],
                    visible: false
                })));
            });
        }
    }, [currentUser]);

    const handleToggleDreamsVisibility = (listId) => {
        setDreamLists((currentLists) => {
            const updatedLists = [];
            for (const list of currentLists) {
                if (list.id === listId) {
                    updatedLists.push({ ...list, visible: !list.visible });
                } else {
                    updatedLists.push(list);
                }
            }
            return updatedLists;
        });
    };

    const handleOpenAddDreams = (listId) => {
        setCurrentListId(listId);
        setAddDreamModalShow(true);
    };

    const handleAddDreamToList = (dreamId) => {
        if (currentListId && dreamId) {
            const db = getDatabase();
            const dreamToAdd = allDreams[dreamId];
            if (!dreamToAdd) {
                console.error("Dream not found");
                return;
            }
            const listRef = ref(db, `dreamLists/${currentUser.uid}/${currentListId}/dreams/${dreamId}`);
            firebaseUpdate(listRef, { id: dreamId, title: dreamToAdd.title })
                .then(() => {
                    setAddDreamModalShow(false);
                })
                .catch((error) => {
                    console.log("Error adding dream to list:", error);
                });
        }
    };

    return (
        <div className="sidebar">
            <p className="sidebar-title">Dream List</p>
            <Button 
             variant="dark"
             onClick={() => setModalShow(true)}
             aria-label="create new dream list">
                Create New Dream List
            </Button>
            <Button 
                variant="secondary" 
                className="my-2" 
                onClick={() => {
                    setFilteredListId(null);
                    if (props.onSelectList) {
                        props.onSelectList(null);
                    }
                }}
                aria-label="Clear filter"
            >
                Clear Filter
            </Button>

            <CreateDreamListModal show={modalShow} onHide={() => setModalShow(false)} currentUser={currentUser} />
            <Accordion defaultActiveKey="0">
                {dreamLists.map((list, index) => (
                    <Accordion.Item eventKey={String(index)} key={list.id}>
                        <Accordion.Header onClick={() => handleToggleDreamsVisibility(list.id)}>{list.name}</Accordion.Header>
                        <Accordion.Body>
                        <ul>
                            {(() => {
                                const dreams = list.dreams;
                                let dreamElements = [];

                                if (dreams && Object.keys(dreams).length > 0) {
                                    for (const key in dreams) {
                                        if (dreams.hasOwnProperty(key)) {
                                            const dream = dreams[key];
                                            dreamElements.push(<li key={dream.id}>{dream.title}</li>);
                                        }
                                    }
                                } else {
                                    dreamElements.push(<li key="no-dreams">You did not add any dreams yet...</li>);
                                }

                                return dreamElements;
                            })()}
                        </ul>
                        <div className="row">
                            <Button variant="info" className="col-md-7 me-2"
                             onClick={() => handleOpenAddDreams(list.id)}
                             aria-label="add dream to the dream list">
                                Add Dreams
                            </Button>
                            <Button 
                             variant="warning" size="sm" className="col-md-4"
                             onClick={() => setFilteredListId(list.id)}
                             aria-label="Filter dream in the list">
                                Filter
                            </Button>
                        </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <p className="sidebar-paragraph mt-2 mb-0">
                Save your dream to a list and you can see their titles below the list.
            </p>
            <p className="sidebar-paragraph">
                You can also do filtering to only display those dreams!
            </p>
            <Modal show={addDreamModalShow} onHide={() => setAddDreamModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Dreams to List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup>
                    {Object.values(allDreams).map((dream) => (
                        <ListGroup.Item key={dream.id} action onClick={() => handleAddDreamToList(dream.id)}>
                            {dream.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DreamListSidebar;