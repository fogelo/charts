import React, {useEffect} from "react";
import * as d3 from "d3"


const Coder = () => {


    useEffect(() => {
        // const div = document.querySelector("#container")
        const div = d3.select("#container")
        div.selectAll("p").data([1, 2, 3]).enter().append("p").text(d => d)
        console.log(div)
    }, [])

    return (
        <div id={"container"}>

        </div>
    );
};

export default Coder;