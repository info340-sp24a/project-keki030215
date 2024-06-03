import React from "react";
import { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import { EditDreamModal } from "./EditDreamModal";
import { getDatabase, ref, onValue, update as firebaseUpdate } from "firebase/database";
import DreamListSidebar from './DreamListSidebar';

const initialDreamEntries = [];

export function DreamDiary(props) {
    const { newDreamNotifications, setNewDreamNotifications, setDreamEntries, currentUser } = props;
    const [close, setClose] = useState(false);
    const [selectedDream, setSelectedDream] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentDream, setCurrentDream] = useState({});
    const [combinedEntries, setCombinedEntries] = useState([...initialDreamEntries]);
    const [inputtedText, setInputtedText] = useState('');
    const [inputtedDate, setInputtedDate] = useState('');
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);


    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const userDreamsRef = ref(db, `dreams/${currentUser.uid}`);
            const unsubscribe = onValue(userDreamsRef, (snapshot) => {
                const dreams = snapshot.val() || {};
                const loadedDreams = Object.keys(dreams).map((key) => ({
                    id: key,
                    ...dreams[key]
                }));
                setDreamEntries(loadedDreams);
                setCombinedEntries([...initialDreamEntries, ...loadedDreams]);
                setFilteredEntries([...initialDreamEntries, ...loadedDreams]);
            });
    
            return () => unsubscribe();
        } else {
            setCombinedEntries([...initialDreamEntries]);
            setDreamEntries([]);
        }
    }, [setDreamEntries, currentUser]);

    useEffect(() => {
        if (selectedListId) {
            const db = getDatabase();
            const listRef = ref(db, `dreamLists/${currentUser.uid}/${selectedListId}/dreams`);
            onValue(listRef, (snapshot) => {
                const dreamIds = snapshot.val() || {};
                setFilteredEntries([]);
    
                Object.keys(dreamIds).forEach((dreamId) => {
                    const dreamRef = ref(db, `dreams/${currentUser.uid}/${dreamId}`);
                    onValue(dreamRef, (dreamSnap) => {
                        const dreamData = { id: dreamSnap.key, ...dreamSnap.val() };
                        setFilteredEntries(prevEntries => [...prevEntries, dreamData]);
                    });
                });
            });
        } else {
            setFilteredEntries(combinedEntries);
        }
    }, [currentUser, selectedListId, combinedEntries]);


    function handleClick(event) {
        setClose(!close);
        const entryId = event.target.id;
        setSelectedDream(entryId);
    }

    function handleNotificationClick(dream, index) {
        return function() {
            const updatedNotifications = newDreamNotifications.filter((_, i) => i !== index);
            setNewDreamNotifications(updatedNotifications);
            setCurrentDream(dream);
            setShowEditModal(true);
        };
    };
    
    function handleEditSave(updatedDream) {
        const db = getDatabase();
        const dreamRef = ref(db, `dreams/${currentUser.uid}/${updatedDream.id}`);
        firebaseUpdate(dreamRef, updatedDream)
            .then(() => {
                setNewDreamNotifications((prevNotifications) =>
                    prevNotifications.filter(notification => notification.id !== updatedDream.id)
                );
                setDreamEntries((prevEntries) => prevEntries.map((entry) => {
                    if (entry.id === updatedDream.id) {
                        return updatedDream;
                    } else {
                        return entry;
                    }
                }));                
                setShowEditModal(false);
            })
            .catch((error) => {
                console.error("Error updating dream in Firebase:", error);
            });
    }

    function handleClose() {
        setShowEditModal(false);
    };

    function handleDreamEdit(dreamData) {
        setCurrentDream(dreamData)
        setShowEditModal(true);
    }

    const handleTextChange = (event) => {
        const typedValue = event.target.value;
        setInputtedText(typedValue);
    }

    const handleDateChange = (event) => {
        const typedValue = event.target.value;
        setInputtedDate(typedValue);
    }

    const handleSearch = (event) => {
        const year = inputtedDate.slice(0, 4);
        const month = inputtedDate.slice(5, 7);
        const day = inputtedDate.slice(8, 10);
        const rearrangedDate = (month + "-" + day + "-" + year);
        if (inputtedText === "" && rearrangedDate === "--") {
            setFilteredEntries(combinedEntries);
        } else {
            const filterWords = inputtedText.toLowerCase();
            const filteredTitles = combinedEntries.filter((entry) => {
                return entry.title.toLowerCase().includes(filterWords) || (entry.tags !== undefined && entry.tags.includes(filterWords));
            });
            const inputDate = Date.parse(rearrangedDate);
            const filteredDates = filteredTitles.filter((entry) => {
                const entryDate = Date.parse(entry.date);
                if (rearrangedDate !== "--") {
                    return inputDate === entryDate;
                } else {
                    return true;
                }
            });
            setFilteredEntries(filteredDates);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    }

    function DreamCard(props) {
        const {dreamData} = props;
        const dreamTypes = ["normal", "nightmare", "lucid"]

        let dreamClassName = "dream-entry card m-2 p2 "
        if (dreamTypes.includes(dreamData.dreamType)) {
            dreamClassName = dreamClassName + dreamData.dreamType + "-dream ";
            if (close && selectedDream === dreamData.id) {
                dreamClassName = dreamClassName + "col-md-7";
            } else {
                dreamClassName = dreamClassName + "col-md-4 col-sm-12"
            }
        }

        const tagArray = (dreamData.tags || []).map((tag, index) => {
            const transformed = (
                <div key={index} className="dream-tag card">
                    {tag}
                </div>
            );
            return transformed;
        });

        return (
            <div className={dreamClassName}>
                <div>
                    <p className="dream-date">
                        {dreamData.date}                        
                        <button type="button" className="view-dream-button" name={dreamData.title} id={dreamData.id} onClick={handleClick} aria-label="View Dream">View Dream</button>
                    </p>
                </div>
                <div><h2 className="dream-title">{dreamData.title}</h2></div>
                
                <Collapse in={close && dreamData.id === selectedDream}>
                    <div>
                        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                            <div className="card dream-entry-text">
                                {dreamData.entry}
                            </div>
                            <div>
                            </div>
                            <div className="dream-image text-center">
                                <img className="dream-entry-img" src={dreamData.img} alt={dreamData.title} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                        <button 
                            aria-label="Check New Dream"
                            className="edit-dream-button"
                            onClick={(event) => handleDreamEdit(dreamData)}>
                            Edit Dream
                        </button>
                        </div>                  
                    </div>
                </Collapse>
                
                <div className="container">
                    <div className="row">
                        {tagArray}
                    </div>
                </div>
                <div><p className="dream-type">{dreamData.dreamType + " dream"}</p></div>
            </div>
        )
        
    }

    const newDreamNotificationsArray = newDreamNotifications.map((dream, index) => {
        const transformed = (
        <button 
            aria-label="Check New Dream"
            key={index} 
            className="notification-button" 
            onClick={handleNotificationClick(dream, index)}>
            New Dream Added - Click to View!
        </button>
        )
        return transformed
    });

    const filteredEntriesArray = filteredEntries.map((dream) => {
        const transformed = (
            <DreamCard key={dream.id} dreamData={dream} />
        )
        return transformed
    });

    return (
        <div>
            <div className="mt-2 d-flex notifications align-items-center justify-content-center">
                {newDreamNotificationsArray}
                <EditDreamModal 
                    show={showEditModal} 
                    onHide={handleClose} 
                    dream={currentDream}
                    onSave={handleEditSave}
                    currentUser={currentUser}
                />
            </div>

            <div className="search-area d-flex justify-content-center">
                <form>
                    <label htmlFor="searchbar">Search for a dream:</label>
                    <input type="text" className="search-bar" id="searchbar" name="Search Bar" value={inputtedText} onChange={handleTextChange} placeholder="Search for a dream" onKeyDown={handleKeyDown} />
                    <label htmlFor="date-filter">Filter by date:</label>
                    <input type="date" className="date-filter" id="date-filter" name="Date Filter" value={inputtedDate} onChange={handleDateChange} onKeyDown={handleKeyDown} />
                    <button type="button" className="search-button" aria-label="Search" onClick={handleSearch} >Search</button>
                </form>
            </div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DreamListSidebar currentUser={currentUser} onSelectList={setSelectedListId} />
                        </div>
                        <div className="col-lg-9 justify-content-evenly">
                            <div className="row justify-content-evenly">
                                {filteredEntriesArray}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}