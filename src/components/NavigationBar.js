import React from 'react';

export function NavigationBar(props) {
    return (
        <nav>
            <div class="title-container">
                <h1>Dream Recorder</h1>
            </div>
            <ul>
                <li><button type="button" aria-label="Homepage" onclick="document.location.href = 'index.html'">Home</button></li>
                <li><button type="button" aria-label="Corkboard" onclick="document.location.href = 'corkboard.html'"> Corkboard </button></li>
                <li><button type="button" aria-label="Dream Dairy" onclick="document.location.href = 'dream-diary.html'">Dream Diary</button></li>
                <li><button type="button" aria-label="Profile" onclick="document.location.href = 'profile.html'">Profile</button></li>
            </ul>
        </nav>
    )
}