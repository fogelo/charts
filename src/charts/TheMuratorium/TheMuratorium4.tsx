import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";


// @ts-ignore
const TheMuratorium1 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 65, 75])

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        const xScale = d3.scaleBand()
            // @ts-ignore
            .domain(data.map((value, index) => index))
            .range([0, 300])
            .padding(0.5)

        const yScale = d3.scaleLinear()
            .domain([0, 150])
            .range([150, 0])

        const colorScale = d3.scaleLinear()
            .domain([75, 150])
            // @ts-ignore
            .range(["green", "red"])
            .clamp(true)


        // @ts-ignore
        const xAxis = d3.axisBottom(xScale).ticks(data.length)
        // @ts-ignore
        svg.select(".xAxis").style("transform", "translateY(150px)").call(xAxis)
        const yAxis = d3.axisRight(yScale)
        // @ts-ignore
        svg.select(".yAxis").style("transform", "translateX(300px)").call(yAxis)


        svg.selectAll(".bar").data(data).join("rect").attr("class", "bar")
            .attr("fill", colorScale)
            .style("transform", "scale(1,-1") // переворвчивает столбики, чтобы анимация была правильная
            // @ts-ignore
            .attr("x", (value, index) => xScale(index))
            .attr("y", -150)
            .attr("width", xScale.bandwidth)
            .transition()
            .attr("height", value => 150 - yScale(value))
    }, [data])

    useEffect(() => {
        setInterval(() => {
            console.log("interval")
            setData(data.map(value => value * Math.random() * 1))
        }, 2000)
    }, [])


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