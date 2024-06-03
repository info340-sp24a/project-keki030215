import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

export function Profile(props) {
    const [user, setUser] = useState(null);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else if (!isSigningOut) {
                signInWithPopup(auth, provider)
                    .then((result) => {
                        setUser(result.user);
                    })
                    .catch((error) => {
                        console.error('Error during sign-in:', error);
                    });
            }
        });

        function cleanup() {
            unsubscribe();
        }

        return cleanup;
    }, [auth, provider, isSigningOut]);

    function goToDreamDiary() {
        navigate('/dream-diary');
    }

    function handleSignOut() {
        setIsSigningOut(true);
        signOut(auth).then(() => {
            setUser(null);
            navigate('/');
        }).catch((error) => {
            console.error('Error during sign-out:', error);
        }).finally(() => {
            setIsSigningOut(false);
        });
    }

    if (!user && !isSigningOut) {
        return (
            <div className="container profile-text d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1>Not signed in</h1>
            </div>
        );
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
                <div className="col-md-8">
                    <div className="box profile-sub-bg text-white p-3 mb-3 d-flex justify-content-center">
                        <div className="btn-group">
                            <button className="btn btn-light btn-lg" type="button" aria-label="Dream Diary" onClick={goToDreamDiary}>MY DIARY</button>
                            <button className="btn btn-light btn-lg ms-2" type="button" aria-label="Sign Out" onClick={handleSignOut}>SIGN OUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}