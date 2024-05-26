import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDatabase, ref, onValue, set as firebaseSet, push as firebasePush, update as firebaseUpdate } from 'firebase/database';
import { NavigationBar } from './NavigationBar';
import { DreamDiary } from './DreamDiaryPage';
import { Main } from './Main';
import { Profile } from './Profile';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCIVvi-jplzgCBjon9pl5T53wAZHulnktU",
    authDomain: "dream-recorder-1fb9c.firebaseapp.com",
    projectId: "dream-recorder-1fb9c",
    storageBucket: "dream-recorder-1fb9c.appspot.com",
    messagingSenderId: "456913610476",
    appId: "1:456913610476:web:e6e196947240c2644627c9"
  };

const app = initializeApp(firebaseConfig);

export function App(props) {

    const db = getDatabase();
    const [dreamEntries, setDreamEntries] = useState([]);
    const [newDreamNotifications, setNewDreamNotifications] = useState([])

    useEffect(() => {
        const dreamsRef = ref(db, 'dreams');
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
    }, [db]);

    const addDreamEntry = (newDream) => {
        if (newDream.id) {
            const dreamRef = ref(db, `dreams/${newDream.id}`);
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
            const newDreamRef = firebasePush(ref(db, "dreams"));
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
                    <Route path="/" element={<Main addDreamEntry={addDreamEntry}/>} />
                    <Route path="/dream-diary" 
                     element={<DreamDiary 
                                dreamEntries={dreamEntries} 
                                newDreamNotifications={newDreamNotifications} 
                                setNewDreamNotifications={setNewDreamNotifications}
                                setDreamEntries={setDreamEntries}/>}
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
