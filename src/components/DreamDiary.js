import React from "react";

export function DreamDiary(props) {
    return (
        <div>
            <div class="search-area">
                <form>
                    <label for="searchbar">Search for a dream:</label>
                    <input type="text" id="searchbar" name="Search Bar" placeholder="Search for a dream" />
                </form>
                <button type="button" aria-label="Search">Search</button>
            </div>


            <section>
                <div class="container">
                    <div class="row d-flex justify-content-evenly">

                        <div class="dream-entry normal-dream card col-md-4 col-sm-12 m-2 p-2">
                            <div>
                                <p class="dream-date">
                                    April 7
                                    <button type="button" aria-label="Edit Dream" onclick="document.location.href = 'dream-diary-selector.html'">Edit Dream</button>
                                </p>
                            </div>
                            <div><h2 class="dream-title">A Night in Amsterdam</h2></div>
                            <div class="container">
                                <div class="row">
                                    <div class="dream-tag card">
                                        Normal Dream
                                    </div>
                                    <div class="dream-tag card">
                                        Family
                                    </div>
                                    <div class="dream-tag card">
                                        Sweet
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dream-entry nightmare card col-md-4 col-sm-12 m-2 p-2">
                            <div>
                                <p class="dream-date">
                                    April 9
                                    <button type="button" aria-label="Edit Dream" onclick="document.location.href = 'dream-diary-selector.html'">Edit Dream</button>
                                </p>
                            </div>
                            <div><h2 class="dream-title">The Fog Approaches</h2></div>
                            <div class="container">
                                <div class="row">
                                    <div class="dream-tag card">
                                        Nightmare
                                    </div>
                                    <div class="dream-tag card">
                                        Scary
                                    </div>
                                    <div class="dream-tag card">
                                        Surreal
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dream-entry normal-dream card col-md-4 col-sm-12 m-2 p-2">
                            <div>
                                <p class="dream-date">
                                    April 10
                                    <button type="button" aria-label="Edit Dream" onclick="document.location.href = 'dream-diary-selector.html'">Edit Dream</button>
                                </p>
                            </div>
                            <div><h2 class="dream-title">A Story of my Uncle</h2></div>
                            <div class="container">
                                <div class="row">
                                    <div class="dream-tag card">
                                        Normal Dream
                                    </div>
                                    <div class="dream-tag card">
                                        Family
                                    </div>
                                    <div class="dream-tag card">
                                        Bittersweet
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dream-entry lucid-dream card col-md-4 col-sm-12 m-2 p-2">
                            <div>
                                <p class="dream-date">
                                    April 11
                                    <button type="button" aria-label="Edit Dream" onclick="document.location.href = 'dream-diary-selector.html'">Edit Dream</button>
                                </p>
                            </div>
                            <div><h2 class="dream-title">Lucid Dream in Tanzinistra</h2></div>
                            <div class="container">
                                <div class="row">
                                    <div class="dream-tag card">
                                        Lucid Dream
                                    </div>
                                    <div class="dream-tag card">
                                        Fantasy
                                    </div>
                                    <div class="dream-tag card">
                                        Surreal
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}