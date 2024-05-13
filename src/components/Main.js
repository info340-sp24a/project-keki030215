import React, { useState } from "react";

export function Main(props) {
    const [dreamText, setDreamText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted with dream text:", dreamText);
        setDreamText("");
    };

    const handleInputChange = (event) => {
        setDreamText(event.target.value);
    };

    return (
        <div className="text-center">
            <h1 className="toptitle">Welcome!</h1>
            <form className="row" onSubmit={handleSubmit}>
                <div className="form-group main-page-text">
                    <label htmlFor="FormControlTextarea1" className="main-page-text">What did you dream about?</label>
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
        </div>
    );
}