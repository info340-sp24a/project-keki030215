import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDatabase, ref, onValue, set as firebaseSet, push as firebasePush } from 'firebase/database';
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
        const newDreamRef = firebasePush(ref(db, "dreams"));
        firebaseSet(newDreamRef, newDream)
        .then(function() {
            setDreamEntries((prevEntries) => [...prevEntries, { ...newDream, id: newDreamRef.key }]);
            setNewDreamNotifications((prevNotifications) => [...prevNotifications, { ...newDream, id: newDreamRef.key }]);
        })
        .catch(function(error) {
            console.error("Error adding new dream to Firebase:", error);
        });
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
                                setNewDreamNotifications={setNewDreamNotifications}/>} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>

            <footer>
                &copy; Copyright 2024
            </footer>
        </div>
    )
}
