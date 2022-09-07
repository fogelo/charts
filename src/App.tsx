import React from "react";
import "./App.css";
import TheMuratorium from "./charts/TheMuratorium/TheMuratorium";
import TheNetNinja from "./charts/TheNetNinja";
import MichaelCouch from "./charts/MichaelCouch/MichaelCouch";
import CoderLessons from "./charts/CoderLessons/CoderLessons";
import LineChart from "./my_charts/LineChart";
import Gchart from "./my_charts/Gchart";
import FreeCodeCamp from "./charts/FreeCodeCamp/FreeCodeCamp";
import My from "./charts/My/My";
import CurranKelleher from "./charts/CurranKelleher/CurranKelleher";

function App() {
    return (
        <div className="App">
            {/*<UiCodeTv/>*/}
            {/*<TheMuratorium/>*/}
            {/*<TheNetNinja/>*/}
            {/*<MichaelCouch/>*/}
            {/*<CoderLessons/>*/}
            {/*<LineChart/>*/}
            {/*<Gchart/>*/}
            {/*<FreeCodeCamp/>*/}

            <My/>

            {/*<CurranKelleher/>*/}
        </div>
    );
}

export default App;
