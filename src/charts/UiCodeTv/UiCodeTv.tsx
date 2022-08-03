import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";
import "./UiCodeTv.scss";
import {svg} from "d3";

const UiCodeTv = () => {

    //1) Set initial data and settings

    const initialData = [
        {
            name: "Car",
            value: 10,
        },
        {
            name: "Food",
            value: 3,
        },
        {
            name: "Telephone",
            value: 9,
        },
        {
            name: "Electricity",
            value: 7,
        },
        {
            name: "Cinema",
            value: 7,
        },
    ]

    const width = 500
    const height = 150
    const padding = 20
    const maxValue = 20

    const [chartData, setChartData] = useState(initialData)
    const svgRef = useRef(null)


    //2) Setup random data generator and svg canvas - холст   //
    const newData = () => chartData.map(d => {
        return {...d, value: Math.ceil(Math.random() * maxValue)}
    })

    useEffect(() => {
        //3) Setup functions for Scales

        //xScales
        const xScale = d3.scalePoint()
            .domain(chartData.map(d => d.name))
            .range([(0 + padding), width - padding])
        // console.log(xScale("Car"))

        //yScales
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(chartData, (d: any) => d.value)])
            .range([height - padding, 0 + padding])
        // console.log(yScale(10))

        //4) Setup functions to draw Lines


        const line = d3.line()
            // @ts-ignore
            .x((d: any) => xScale(d.name))
            .y((d: any) => yScale(d.value))
        // .curve(d3.curveMonotoneX)
        // @ts-ignore
        console.log(line(chartData))

        //5) Draw Line
        // @ts-ignore
        d3.select(svgRef.current).select("path")
            // @ts-ignore
            .attr("d", (value: any) => line(chartData))
            .attr("stroke", "white")

        //6) Setup functions to draw x and y Axes
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        //7) Draw x and y Axes
        d3.select("#xAxis").remove()
        d3.select(svgRef.current)
            .append("g")
            .attr("transform", `translate(0,${height - padding})`)
            .attr("id", "xAxis")
            .call(xAxis)

        d3.select("#yAxis").remove()
        d3.select(svgRef.current)
            .append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .attr("id", "yAxis")
            .call(yAxis)
    }, [chartData])


    return (
        <div className={"UiCodeTv"}>
            <svg id={"chart"} viewBox={"0 0 500 150"} ref={svgRef}>
                <path fill={"none"} strokeWidth={"5"}/>
            </svg>
            <p>
                <button onClick={() => setChartData(newData())}>
                    click to refresh
                </button>
            </p>
        </div>
    );
};

export default UiCodeTv;