import React from 'react';

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
            <Main />
            </main>

            <footer>
                &copy; Copyright 2024
            </footer>
        </div>
    )
}