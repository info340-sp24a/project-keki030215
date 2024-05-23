import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NavigationBar } from "./NavigationBar"
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

    const [dreamEntries, setDreamEntries] = useState([]); // save for future updating entries
    const [newDreamNotifications, setNewDreamNotifications] = useState([])

    const addDreamEntry = (newDream) => {
        setDreamEntries(prevEntries => [...prevEntries, newDream]);
        setNewDreamNotifications(prevNotifications => [...prevNotifications, newDream]);
        console.log("A new dream is added:", newDream);
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