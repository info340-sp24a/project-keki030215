import React from 'react';

export function NavigationBar(props) {
    return (
        <nav>
            <div className="title-container">
                <h1>Dream Recorder</h1>
            </div>
            <ul>
                <li><button type="button" aria-label="Homepage">Home</button></li>
                <li><button type="button" aria-label="Corkboard"> Corkboard </button></li>
                <li><button type="button" aria-label="Dream Diary">Dream Diary</button></li>
                <li><button type="button" aria-label="Profile">Profile</button></li>
            </ul>
        </nav>
    )
}