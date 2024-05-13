import React from "react";

export function DreamDiary(props) {
    
    function DreamCard(props) {
        const {date, title, dreamType, tags} = props;

        const dreamTypes = ["normal", "nightmare", "lucid"]

        let dreamClassName = "dream-entry card col-md-4 col-sm-12 m-2 p2 "

        if (dreamTypes.includes(dreamType)) {
            dreamClassName = dreamClassName + dreamType + "-dream";
        }

        const tagArray = tags.map((tag) => {
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
                        {date}
                        <button type="button" aria-label="Edit Dream">Edit Dream</button>
                    </p>
                </div>
                <div><h2 className="dream-title">{title}</h2></div>
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
            <div className="search-area">
                <form>
                    <label htmlFor="searchbar">Search for a dream:</label>
                    <input type="text" id="searchbar" name="Search Bar" placeholder="Search for a dream" />
                </form>
                <button type="button" aria-label="Search">Search</button>
            </div>


            <section>
                <div className="container">
                    <div className="row d-flex justify-content-evenly">
                        <DreamCard date="April 7" title="A Night in Amsterdam" dreamType="normal" tags={["Normal Dream", "Family", "Nostalgic", "Realistic"]} />
                        <DreamCard date="April 9" title="The Fog Approaches" dreamType="nightmare" tags={["Nightmare Dream", "Scary", "Surreal",]} />
                        <DreamCard date="April 10" title="A Dream About my Uncle" dreamType="normal" tags={["Normal Dream", "Family", "Bittersweet"]} />
                        <DreamCard date="April 12" title="Lucid Dream in Tanzinistra" dreamType="lucid" tags={["Lucid Dream", "Fantasy", "Surreal"]} />
                    </div>
                </div>
            </section>
        </div>
    )
}