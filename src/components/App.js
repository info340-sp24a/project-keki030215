import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NavigationBar } from "./NavigationBar"
import { DreamDiary } from './DreamDiaryPage';
import { Corkboard } from './Corkboard';
import { CorkboardSelector } from './CorkboardSelector';
import { Main } from './Main';
import { Profile } from './Profile';


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
                    <Route path="/corkboard" element={<Corkboard />} />
                    <Route path="/corkboard-selector" element={<CorkboardSelector />} />
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