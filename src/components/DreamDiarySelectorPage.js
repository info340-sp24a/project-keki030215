import React from "react";

export function DreamDiarySelector(props) {
    return (
        <div className="container">
            <div className="dream-entry normal-dream card">
                <div>
                    <p>
                        April 7
                    </p>
                </div>
                <div><h2 className="dream-title">A Night in Amsterdam</h2></div>
                <div className="d-lg-flex">
                    <div className="dream-description card">
                        Last night I had a dream that me and my family were in Amsterdam. Granted I never been to Amsterdam in person but I've seen lots of pictures of the city from postcards, videos, and pictures. We had a lot of fun going travelling everywhere, such as churches and eating food and taking pictures despite the fact that I don't even know if the places we went to actually exist in Amsterdam. I also couldn't understand anyone there and I don't know if that was because they were all speaking Dutch or because I was dreaming.
                    </div>
                    <div className="dream-image">
                        <img className="dream-entry-img" src="img/jordan-pulmano-Ls3eX4BSBWA-unsplash.jpg" alt="A picture of the city of Amsterdam at night" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="dream-tag card">
                            Normal Dream
                        </div>
                        <div className="dream-tag card">
                            Family
                        </div>
                        <div className="dream-tag card">
                            Sweet
                        </div>
                    </div>
                </div>
                <button className="tag-button" type="button" aria-label="Add A Tag">Add a tag + </button>
            </div>
        </div>
    )

}