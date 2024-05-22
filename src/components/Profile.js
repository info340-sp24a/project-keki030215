import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

export function Profile(props) {
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }, [auth, provider]);

    function goToDreamDiary() {
        navigate('/dream-diary');
    }

    function goToCorkboard() {
        navigate('/corkboard');
    }

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