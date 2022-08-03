import React, {FC, useEffect, useState} from "react";
import * as d3 from "d3"

interface IProps {
    height: number
    width: number
}

const LineChart: FC<IProps> = ({width, height}) => {

    const [data, setData] = useState<{ label: number, value: number }[]>([])


    useEffect(() => {
        if (data.length > 0) {
            // drawChart()
        } else {
            generateData()
        }
    }, [data])

    const generateData = () => {
        const chartData = []
        for (let i = 0; i < 20; i++) {
            const value = Math.floor(Math.random() * i + 3)
            chartData.push({
                label: i,
                value
            })
            setData(chartData)
        }
    }

    //Establish margins
    const margin = {top: 10, right: 50, bottom: 50, left: 50}

    //Establish x and y max values
    const yMinValue = d3.min(data, d => d.value)
    const yMaxValue = d3.max(data, d => d.value)
    const xMinValue = d3.min(data, d => d.value)
    const xMaxValue = d3.max(data, d => d.value)

    //create chart area
    // const svg = d3
    //     .select("#container")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", width + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", `translate(${margin.left},${margin.top})`)


    // @ts-ignore
    const svg = d3
        // .select("#container")
        .selectAll("div")
        .data([10, 20, 30])
        .text((e) => e)

    // console.log(d3.select("body").select("#container"))

    //create scale for the xaxis
    const xScale = d3
        .scaleLinear()
        // @ts-ignore
        .domain([xMinValue, xMaxValue])
        .range([0, width])

    //create scale for the yaxis
    const yScale = d3
        .scaleLinear()
        // @ts-ignore
        .domain([0, yMaxValue])
        .range([height, 0])

    //create x grid
    svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
    // .call()

    return (
        <div>
            <div id={"container"}/>
        </div>
    );
};

export default LineChart;