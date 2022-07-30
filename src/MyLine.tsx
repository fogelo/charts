import React, {useEffect, useRef} from "react";
import * as d3 from "d3"
const MyLine = () => {

    const svgRef = useRef(null)
    const data = [10,20,30,40,50,60,70,80]
    useEffect(()=>{
        const svg = d3.select(svgRef.current)

        const xScale = d3.scaleLinear().domain([0,data.length-1]).range([0,100])
        const yScale = d3.scaleLinear().domain([0,100]).range([0,100])





        svg.on("mousemove",(event)=>{
            console.log(event)
            svg.selectAll("line")
                .data([data])
                .join("line")
                .attr("x1", event.offsetX)
                .attr("x2", event.offsetX)
                .attr("y1", "0")
                .attr("y2", "100")

            svg.attr("cursor", "pointer")

        })



    },[])

    return (
        <div>
            <svg ref={svgRef} width={"100%"} height={"100%"}>
                <line x1={10} x2={10} y1={0} y2={100} stroke={"black"}/>
            </svg>
        </div>
    );
};

export default MyLine;