import React from "react";

export function Profile(props) {
    const goToDreamDiary = () => {
        window.location.href = 'dream-diary.html';
    };

    const goToCorkboard = () => {
        window.location.href = 'corkboard.html';
    };

    return (
        <div className="container profile-text">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="box profile-main-bg p-3 mb-3">
                        <h2>John Doe</h2>
                        <img className="profile-img" src="img/profilepic.jpeg" alt="A man" />
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div className="box profile-sub-bg text-white p-3 mb-3">
                        <button className="btn btn-light btn-lg" type="button" aria-label="Dream Diary" onClick={goToDreamDiary}>MY DIARY</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box profile-sub-bg text-white p-3 mb-3">
                        <button className="btn btn-light btn-lg" type="button" aria-label="Corkboard" onClick={goToCorkboard}>MY BOARD</button>
                    </div>
                </div>
            </div>
        </div>
    );
}