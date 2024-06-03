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

    function handleFilterClick(event) {
        const listId = event.currentTarget.dataset.listId;
        setFilteredListId(listId);
        if (props.onSelectList) {
            props.onSelectList(listId);
        }
    }

    function handleToggleDreamsVisibility(listId) {
        performToggleDreamsVisibility(listId);
    }

    function performToggleDreamsVisibility(listId) {
        setDreamLists(function(currentLists) {
            const updatedLists = [];
            for (let i = 0; i < currentLists.length; i++) {
                let list = currentLists[i];
                if (list.id === listId) {
                    updatedLists.push({ ...list, visible: !list.visible });
                } else {
                    updatedLists.push(list);
                }
            }
            return updatedLists;
        });
    }

    function handleOpenAddDreams(event) {
        const listId = event.currentTarget.dataset.listId;
        setCurrentListId(listId);
        setAddDreamModalShow(true);
    }


    function handleAddDreamToList(event) {
        const dreamId = event.currentTarget.dataset.listId;
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
                    console.log(filteredListId);
                })
                .catch((error) => {
                    console.log("Error adding dream to list:", error);
                });
        }
    };

    const accordionItems = dreamLists.map((list) => (
        <Accordion.Item eventKey={String(list.id)} key={list.id}>
            <Accordion.Header onClick={handleToggleDreamsVisibility}>{list.name}</Accordion.Header>
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
                    <Button variant="info" className="col-md-7 me-2"  data-list-id={list.id} onClick={handleOpenAddDreams}>
                        Add Dreams
                    </Button>
                    <Button variant="warning" size="sm" className="col-md-4" data-list-id={list.id} onClick={handleFilterClick}>
                        Filter
                    </Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    ));
    
    function handleCreateNewDreamListClick() {
        setModalShow(true);
    }

    function handleClearFilter() {
        setFilteredListId(null);
        if (props.onSelectList) {
            props.onSelectList(null);
        }
    }

    function handleHideModal() {
        setModalShow(false);
    }

    function handleHideDreamModal() {
        setAddDreamModalShow(false);
    }

    const titleArray = Object.values(allDreams).map((dream) => {
        return (
        <ListGroup.Item key={dream.id} action data-list-id={dream.id} onClick={handleAddDreamToList}>
            {dream.title}
        </ListGroup.Item>
    )});
    
    return (
        <div className="sidebar text-center">
            <h1 className="sidebar-title">Dream List</h1>
            <Button 
             className="mx-auto"
             variant="dark"
             onClick={handleCreateNewDreamListClick}
             aria-label="create new dream list">
                Create New Dream List
            </Button>
            <Button 
                variant="secondary" 
                className="my-2" 
                onClick={handleClearFilter}
                aria-label="Clear filter"
            >
                Clear Filter
            </Button>

            <CreateDreamListModal show={modalShow} onHide={handleHideModal} currentUser={currentUser} />
            <Accordion defaultActiveKey="0">
                {accordionItems}
            </Accordion>
            <p className="sidebar-paragraph mt-2 mb-0">
                Save your dream to a list and you can see their titles below the list.
            </p>
            <p className="sidebar-paragraph">
                You can also do filtering to only display those dreams!
            </p>
            <Modal show={addDreamModalShow} onHide={handleHideDreamModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Dreams to List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup>
                    {titleArray}
                </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DreamListSidebar;
