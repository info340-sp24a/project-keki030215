import React from 'react';

const sampleData = [
    { date: '4/2', imgSrc: 'img/grid1-img.webp', imgAlt: 'forest in dream', content: '[grid 1 content]' },
    { date: '4/10', imgSrc: 'img/grid2-img.jpeg', imgAlt: 'wave in dream', content: '[grid 2 content]' },
    { date: '4/6', imgSrc: 'img/grid3-img.webp', imgAlt: 'mountain in dream', content: '[grid 3 content]' },
    { date: '5/16', imgSrc: 'img/grid4-img.webp', imgAlt: 'a hand touching a leaf', content: '[grid 4 content]' },
    { date: '6/2', imgSrc: 'img/grid5-img.webp', imgAlt: 'grass in dream', content: '[grid 5 content]' }
];

export function Corkboard(props) {
    const cardItems = sampleData.map((cardData, index) => (
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