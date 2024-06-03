import React from 'react';
import { Link } from 'react-router-dom';

export function NavigationBar(props) {
    return (
        <nav>
            <div className="title-container">
                <img src="/img/favicon.png" alt="Logo" className="logo" />
                <h1>Dream Recorder</h1>
            </div>
            <ul>
                <li><Link to="/"><button type="button" aria-label="Homepage">Home</button></Link></li>
                <li><Link to="/dream-diary"><button type="button" aria-label="Dream Diary">Dream Diary</button></Link></li>
                <li><Link to="/profile"><button type="button" aria-label="Profile">Profile</button></Link></li>
            </ul>
        </nav>
    )
}