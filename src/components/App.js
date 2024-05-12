import React from 'react';

import { NavigationBar } from "./NavigationBar"
import { DreamDiary } from './DreamDiary';


// <DreamDiary />

export function App(props) {
    return (
        <div>
            <body>
                <header>
                    <NavigationBar />
                </header>

                <main>
                </main>

                <footer>
                    &copy; Copyright 2024
                </footer>
            </body>
        </div>
    )
}