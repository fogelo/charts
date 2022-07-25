import React, {useEffect} from "react";
import * as d3 from "d3"

const Histogram = () => {
    useEffect(() => {
        var data = [10, 5, 12, 15];
        var width = 300,
            scaleFactor = 20,
            barHeight = 30;


        const graph = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", barHeight * data.length)

        const bar = graph.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => "translate(0, " + i * barHeight + ")")

        bar.append("rect")
            .attr("width", d => d * scaleFactor)
            .attr("height", barHeight - 5)

        bar.append("text")
            .attr("x", d => d * scaleFactor)
            .attr("y", barHeight / 2)
            .attr("dy", ".35rem")
            .text(d => d)
        console.log(bar)

    }, [])

    return (
        <div id={"container"}>

        </div>
    );
};

export default Histogram;