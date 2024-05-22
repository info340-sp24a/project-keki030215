import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export function Profile(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                signInWithPopup(auth, provider)
                    .then((result) => {
                        setUser(result.user);
                    })
                    .catch((error) => {
                        console.error('Error during sign-in:', error);
                    });
            }
        });

        return () => unsubscribe();
    }, [auth, provider]);

    function goToDreamDiary() {
        navigate('/dream-diary');
    }

    function goToCorkboard() {
        navigate('/corkboard');
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container profile-text">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="box profile-main-bg p-3 mb-3">
                        <h2>{user.displayName}</h2>
                        <img className="profile-img" src={user.photoURL} alt={user.displayName} />
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