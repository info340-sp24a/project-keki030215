import React from 'react';
import Corkboard_Initial from '../data/corkboard_initial.json';

export function Corkboard(props) {
    const cardItems = Corkboard_Initial.map((cardData, index) => (
        <CardItem 
            key={index}
            cardData={cardData}
        />
    ));

    return (
        <main>
            <div className="add-dream-btn">
                <button 
                    className="btn btn-light btn-lg" 
                    type="button" 
                    aria-label="Add A Dream" 
                >
                    Add a Dream
                </button>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {cardItems}
                </div>
            </div>
        </main>
    );
}

function CardItem(props) {
    const { date, imgSrc, imgAlt, content } = props.cardData;

    return (
        <div className="col-md-4 col-sm-12">
            <div className="card corkboard-card" style={{ height: '12rem' }}>
                <img src={imgSrc} className="card-img-top grid-img" alt={imgAlt} />
                <div className="card-body">
                    <h2 className="card-title">{date}</h2>
                    <p className="card-text">{content}</p>
                </div>
            </div>
        </div>
    );
}