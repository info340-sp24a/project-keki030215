import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { NavigationBar } from "./NavigationBar"
import { DreamDiary } from './DreamDiaryPage';
import { DreamDiarySelector } from './DreamDiarySelectorPage';
import { Corkboard } from './Corkboard';
import { CorkboardSelector } from './CorkboardSelector';
import { Main } from './Main';
import { Profile } from './Profile';

/*
To test out the individual pages, put the components in the quotes in between <main> </main>

"<DreamDiary />"
"<DreamDiarySelector />"
"<Corkboard />"
"<CorkboardSelector />"
*/

export function App(props) {
    return (
        <div>
            <header>
                <NavigationBar />
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/corkboard" element={<Corkboard />} />
                    <Route path="/corkboard-selector" element={<CorkboardSelector />} />
                    <Route path="/dream-diary" element={<DreamDiary />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>

            <footer>
                &copy; Copyright 2024
            </footer>
        </div>
    )
}