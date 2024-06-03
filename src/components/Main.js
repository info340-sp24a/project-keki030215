import React, { useState } from "react";
import { NoInputModal, SubmissionModal } from './MainModal';

export function Main(props) {
    const { currentUser, addDreamEntry } = props;
    const [dreamText, setDreamText] = useState("");
    const [showNoInputModal, setShowNoInputModal] = useState(false);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (!currentUser) {
            alert("You must be logged in to submit a dream. :-(");
            return;
        }
        setDreamText("");
        if (dreamText.trim() === "") {
            setShowNoInputModal(true);
          } else {
            const newDream = {
                date: new Date().toLocaleDateString("en-US"),
                entry: dreamText,
                title: "",
                dreamType: "normal",
                tags: [],
                img: "img/no-img-dream.jpeg"
            };
            addDreamEntry(newDream);
            setShowSubmissionModal(true);
            setDreamText("");
            console.log("Form submitted with dream text:", dreamText);
          }
    };

    function handleInputChange(event) {
        setDreamText(event.target.value);
    };

    function handleNoInputCloseModal() {
        setShowNoInputModal(false);
    };

    function handleSubmissionCloseModal() {
        setShowSubmissionModal(false);
    };

    return (
        <div className="text-center">
            <h1 className="toptitle">Welcome!</h1>
            <form className="row main-form" onSubmit={handleSubmit}>
                <div className="form-group main-page-text">
                    <label htmlFor="FormControlTextarea1" className="main-page-text">What did you dream about? <img src="/img/pencil.png" alt="pencil icon" className="pencil-icon" /></label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea1"
                        rows="9"
                        placeholder="Tell us what you dream about..."
                        value={dreamText}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit" aria-label="Submit" className="d-grid gap-2 col-4 mx-auto btn btn-primary main-page-text main-page-button">FINISH</button>
            </form>
            <NoInputModal 
                show={showNoInputModal} 
                onHide={handleNoInputCloseModal} 
                title="No Input... :-("
            />
            <SubmissionModal
                show={showSubmissionModal}
                onHide={handleSubmissionCloseModal}
                title="Dream Recorded :-)"
            />
        </div>
    );
}