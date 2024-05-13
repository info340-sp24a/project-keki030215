import React from 'react';

const tagsData = [
    { label: "Scary", id: 1 },
    { label: "Love", id: 2 },
    { label: "Funny", id: 3 },
    { label: "Future", id: 4 },
    { label: "Surreal", id: 5 },
    { label: "Childhood", id: 6 },
    { label: "Family", id: 7 },
    { label: "Adventure", id: 8 }
];

export function CorkboardSelector(props) {
    const tagItems = tagsData.map((tagData) => (
        <TagItem 
            key={tagData.id}
            tagData={tagData}
        />
    ));

    return (
        <main>
            <div className="container">
                <div className="row corkboard-selector">
                    <div className="col select-dream-btn">
                        <button 
                            type="button" 
                            aria-label="Select Dream" 
                            className="btn btn-light btn-lg select-your-dream">
                            Select Your Dream
                        </button>
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col col-12 tags-selection">
                                <button 
                                    type="button" 
                                    aria-label="Select Tags" 
                                    className="btn btn-light btn-lg">
                                    Select Tags
                                </button>
                            </div>

                            <div className="row">
                                {tagItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}


function TagItem(props) {

    const { label, id } = props.tagData;

    return (
        <div className="col col-6 tag">
            <button 
                type="button" 
                aria-label={label + "-tag"} 
                className="btn btn-light btn-lg"
            >
                {label}
            </button>
        </div>
    );
}