import React from 'react';

import { NavigationBar } from "./NavigationBar"
import { DreamDiary } from './DreamDiaryPage';
import { DreamDiarySelector } from './DreamDiarySelectorPage';

/*
To test out the individual pages, put the components in the quotes in between <main> </main>

"<DreamDiary />"
"<DreamDiarySelector />"
*/

export function App(props) {
    return (
        <div>
            <header>
                <NavigationBar />
            </header>

            <main>
            </main>

            <footer>
                &copy; Copyright 2024
            </footer>
        </div>
    )
}