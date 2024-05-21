import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

const initialDreamEntries = [
    {date:"April 7", title:"A Night in Amsterdam", dreamType:"normal", tags:["Normal Dream", "Family", "Nostalgic", "Realistic"], img:"img/amsterdam-night.jpg", entry:"I had a dream that I was in Amsterdam with my family. We ate food, took pictures, and spent long hours staring at the city lights at night"},

    {date:"April 9", title:"The Fog Approaches", dreamType:"nightmare", tags:["Nightmare Dream", "Scary", "Surreal"], img: "img/black-fog.jpg", entry:"I had a nightmare last night about the fog, a black, smokey-like mist that approached my house from all angles. It seeped through the bottom of the doorframe and engulfed me. I woke up as it covered my eyes."},

    {date:"April 10", title:"A Dream About my Great Uncle", dreamType:"normal", tags:["Normal Dream", "Family", "Bittersweet"], img: "img/great-uncle.jpg" , entry:"I had a dream where I was in my late great uncle's office in his grocery store. He was sitting on the couch at the far end of the room as he always did when relaxing and beckoned me over. We talked about how my life was and what I had planned for my future, culminating with him telling me how proud he was with how far I had come since his departure."},

    {date:"April 12", title:"Lucid Dream in Tanzinistra", dreamType:"lucid", tags:["Lucid Dream", "Fantasy"], img: "img/south-africa.jpg", entry: "I had a lucid dream in a fictitious world called Tanzinistra. Knowing it was a dream, I explored what it had to offer. I would finish this entry but I am too lazy."}
]

export function DreamDiary(props) {
    const { dreamEntries, newDreamNotifications, setNewDreamNotifications } = props;
    const [open, setOpen] = useState(false);
    const [selectedDream, setSelectedDream] = useState("");

    const dreamEntryArray = initialDreamEntries.map((dreamEntry) => {
        const transformed = <DreamCard dreamData={dreamEntry} key={dreamEntry.title} />
        return transformed;
    });

    const handleClick = (event) => {
        setOpen(!open);
        const entryName = event.target.name;
        setSelectedDream(entryName);
    }

    function handleNotificationClick(index) {
        alert(`New dream added: ${newDreamNotifications[index].entry}`);
        const updatedNotifications = newDreamNotifications.filter((_, i) => i !== index);
        setNewDreamNotifications(updatedNotifications);
    };

    function DreamCard(props) {
        const {dreamData} = props;
        const dreamTypes = ["normal", "nightmare", "lucid"]

        let dreamClassName = "dream-entry card m-2 p2 "
        if (dreamTypes.includes(dreamData.dreamType)) {
            dreamClassName = dreamClassName + dreamData.dreamType + "-dream ";
            if (open && selectedDream === dreamData.title) {
                dreamClassName = dreamClassName + "col-md-7";
            } else {
                dreamClassName = dreamClassName + "col-md-4 col-sm-12"
            }
        }

        const tagArray = dreamData.tags.map((tag) => {
            const transformed = (
                <div key={tag} className="dream-tag card">
                    {tag}
                </div>
            )
            return transformed
        })

        return (
            <div className={dreamClassName}>
                <div>
                    <p className="dream-date">
                        {dreamData.date}
                        <button type="button" name={dreamData.title} onClick={handleClick} aria-label="View Dream">View Dream</button>
                    </p>
                </div>
                <div><h2 className="dream-title">{dreamData.title}</h2></div>
                
                <Collapse in={open && dreamData.title === selectedDream}>
                    <div>
                        <div className="d-flex flex-column flex-md-row">
                            <div className="card dream-entry-text">
                                {dreamData.entry}
                            </div>
                            <div className="dream-image text-center">
                                <img className="dream-entry-img" src={dreamData.img} alt={dreamData.title} />
                            </div>
                        </div>
                        
                    </div>
                </Collapse>
                
                <div className="container">
                    <div className="row">
                        {tagArray}
                    </div>
                </div>
            </div>
        )
        
    }

    return (
        <div>
            <div className="mt-2 d-flex notifications align-items-center justify-content-center">
                {newDreamNotifications.map(function(dream, index) {
                    return (
                        <button 
                         key={index} 
                         className="notification-button" 
                         aria-label="view new dream"
                         onClick={function() { handleNotificationClick(index); }}>
                         New Dream Added - Click to View!
                        </button>
                    );
                })}
            </div>

            <div className="search-area">
                <form>
                    <label htmlFor="searchbar">Search for a dream:</label>
                    <input type="text" className="search-bar" id="searchbar" name="Search Bar" placeholder="Search for a dream" />
                    <button type="button" aria-label="Search">Search</button>
                </form>
                
            </div>


            <section>
                <div className="container">
                    <div className="row d-flex justify-content-evenly">
                        { dreamEntryArray }
                    </div>
                </div>
            </section>
        </div>
    )
}