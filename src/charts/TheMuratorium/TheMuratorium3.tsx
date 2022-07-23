import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";


// @ts-ignore
const TheMuratorium1 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 65, 75])

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300])

        const yScale = d3.scaleLinear()
            .domain([0, 75])
            .range([150, 0])

        // @ts-ignore
        const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1)
        // @ts-ignore
        svg.select(".xAxis").style("transform", "translateY(150px)").call(xAxis)  // можно так xAxis(svg.select(".xAxis")
        const yAxis = d3.axisRight(yScale)
        // @ts-ignore
        svg.select(".yAxis").style("transform", "translateX(300px)").call(yAxis)  // можно так xAxis(svg.select(".xAxis")

        // generate the "d" attribute of a path element
        // @ts-ignore
        const myLine = d3.line()
            //x и y это методы переборы массива наподобие map, который мы будем потом передавать в myLine
            .x((value, index) => xScale(index))
            // @ts-ignore
            //вызовет и передаст значения внутри
            .y(yScale)

        //renders path element, and attaches
        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            // @ts-ignore
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data])

    return (
        <div>
            <svg ref={svgRef} id={"chart"} viewBox={"0 0 500 150"}>

                <g className={"xAxis"}/>
                <g className={"yAxis"}/>

                {/*вот так строится график в ручную*/}
                {/*<path d={"M0,150 100,100 150,120"} stroke={"blue"} fill={"none"}/>*/}
                {/*<path fill={"none"} strokeWidth={"5"}/>*/}
            </svg>
        </div>
    );
};

export default TheMuratorium1;