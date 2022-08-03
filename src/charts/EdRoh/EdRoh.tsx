import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

const EdRoh = () => {
    const [data] = useState([25, 50, 35, 15, 94, 10])
    const svgRef = useRef(null)

    useEffect(() => {
        //setting up svg
        const w = 400
        const h = 100
        d3.select(svgRef.current)
            .attr("width", w)
            .attr("height", h)
            .style("background", "#d3d3d3")
            .style("margin-top", "50")

        //setting the scaling
        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w])
        const yScale = d3.scaleLinear()
            .domain([0, h])
            .range([h, 0])

        const generateScaledLine = d3.line()
            .x((d, i) => xScale(i))
            // .y(yScale)
            .curve(d3.curveCardinal)
        // setting the axes
        // setting up the data for the svg
    }, [data])


    return (
        <div>
            <svg ref={svgRef}>

            </svg>
        </div>
    );
};

export default EdRoh;