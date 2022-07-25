import React from "react";
import "./App.css";
import TheNetNinja from "./charts/TheNetNinja";
import CoderLessons from "./CoderLessons/CoderLessons";
import TheMuratorium from "./charts/TheMuratorium/TheMuratorium";

function App() {
    return (
        <div className="App">
            {/*<UiCodeTv/>*/}
            <TheMuratorium/>
            {/*<TheNetNinja/>*/}
            {/*<MichaelCouch/>*/}
            {/*<CoderLessons/>*/}
        </div>
    );
}

export default App;
