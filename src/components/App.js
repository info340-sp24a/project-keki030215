import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDatabase, ref, onValue, set as firebaseSet, push as firebasePush, update as firebaseUpdate } from 'firebase/database';
import { NavigationBar } from './NavigationBar';
import { DreamDiary } from './DreamDiaryPage';
import { Main } from './Main';
import { Profile } from './Profile';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCIVvi-jplzgCBjon9pl5T53wAZHulnktU",
    authDomain: "dream-recorder-1fb9c.firebaseapp.com",
    projectId: "dream-recorder-1fb9c",
    storageBucket: "dream-recorder-1fb9c.appspot.com",
    messagingSenderId: "456913610476",
    appId: "1:456913610476:web:e6e196947240c2644627c9"
  };

initializeApp(firebaseConfig);

export function App(props) {

    const db = getDatabase();
    const [dreamEntries, setDreamEntries] = useState([]);
    const [newDreamNotifications, setNewDreamNotifications] = useState([])
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUserObj) => {
            setCurrentUser(firebaseUserObj);
            if (currentUser) {
                const dreamsRef = ref(db, `dreams/${currentUser.uid}`);
            onValue(dreamsRef, (snapshot) => {
                const dreams = snapshot.val();
                const loadedDreams = [];
                for (const key in dreams) {
                    loadedDreams.push({
                        id: key,
                        ...dreams[key]
                    });
                }
                setDreamEntries(loadedDreams);
            });
            } else {
                setDreamEntries([]);
            }
        });
    }, [db, currentUser]);

    const addDreamEntry = (newDream) => {
        if (!currentUser) {
            console.log("No user signed in!");
            alert("You must be logged in to save dreams. :-(");
            return;
        }
        if (newDream.id) {
            const dreamRef = ref(db, `dreams/${currentUser.uid}`);
            firebaseUpdate(dreamRef, newDream)
                .then(() => {
                    setDreamEntries((prevEntries) =>
                        prevEntries.map((entry) => {
                            if (entry.id === newDream.id) {
                                return newDream;
                            } else {
                                return entry;
                            }
                        })
                    );
                    setNewDreamNotifications((prevNotifications) =>
                        prevNotifications.filter((notification) => notification.id !== newDream.id)
                    );
                })
                .catch((error) => {
                    console.error("Error updating dream in Firebase:", error);
                });
        } else {
            const newDreamRef = firebasePush(ref(db, `dreams/${currentUser.uid}`));
            firebaseSet(newDreamRef, { ...newDream, id: newDreamRef.key })
                .then(() => {
                    setDreamEntries((prevEntries) => [...prevEntries, { ...newDream, id: newDreamRef.key }]);
                    setNewDreamNotifications((prevNotifications) => [...prevNotifications, { ...newDream, id: newDreamRef.key }]);
                })
                .catch((error) => {
                    console.error("Error adding new dream to Firebase:", error);
                });
        }
    };

    return (
        <div>
            <header>
                <NavigationBar />
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Main addDreamEntry={addDreamEntry} currentUser={currentUser}/>} />
                    <Route path="/dream-diary" 
                     element={<DreamDiary 
                                dreamEntries={dreamEntries} 
                                newDreamNotifications={newDreamNotifications} 
                                setNewDreamNotifications={setNewDreamNotifications}
                                setDreamEntries={setDreamEntries}
                                currentUser={currentUser}/>}
                                 />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>

            <footer>
                &copy; Copyright 2024
            </footer>
        </div>
    )
}
