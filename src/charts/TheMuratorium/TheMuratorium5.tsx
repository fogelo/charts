import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {index, transition} from "d3";


// @ts-ignore
const TheMuratorium5 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 65, 75])

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        const xScale = d3.scaleBand() // почти тоже самое, что и linear только для гистограмм // теперь xScale мне даст координаты левой грани прямоугольника по Х в моем маштабе
            // @ts-ignore
            .domain(data.map((value, index) => index)) // здесь нам требуется фиксированая засечка для каждого значения массива,
            // чтобы построить эту гистограмму. То есть нужен массив с явными значениями
            .range([0, 300])
            .padding(0.5)

        const yScale = d3.scaleLinear()
            .domain([0, 150])
            .range([150, 0])

        //чтобы расскрасить стобики нужно создать еще одну линейную шкалу по y
        const colorScale = d3.scaleLinear()
            .domain([75, 100, 150])
            // @ts-ignore
            .range(["green", "orange", "red"])
            .clamp(true)//зафиксировать. если true тогда значения которые ниже 75 или выше 150 будут строго зелеными и красными соответсвенно


        // @ts-ignore
        const xAxis = d3.axisBottom(xScale).ticks(data.length)
        // @ts-ignore
        svg.select(".xAxis").style("transform", "translateY(150px)").call(xAxis)
        const yAxis = d3.axisRight(yScale)
        // @ts-ignore
        svg.select(".yAxis").style("transform", "translateX(300px)").call(yAxis)


        svg.selectAll(".bar").data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1,-1") // переворвчивает столбики, чтобы анимация была правильная
            // @ts-ignore
            .attr("x", (value, index) => xScale(index))
            .attr("y", -150)
            .attr("width", xScale.bandwidth())//bandwidth вернут ширину каждого столбика
            .on("mouseenter", (event, element) => {
                svg.selectAll(".tooltip").data([element])
                    .join(enter => enter.append("text").attr("y", yScale(element) - 4))
                    .attr("class", "tooltip")
                    .text(element)
                    //@ts-ignore
                    .attr("x", (e) => xScale(data.indexOf(e)) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition()
                    .attr("y", yScale(element) - 8)
                    .style("fill", "red")
            })
            // .on("mouseleave", () => svg.select(".tooltip").remove())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value => 150 - yScale(value))
    }, [data])

    return (
        <div>
            <svg ref={svgRef} id={"chart"} viewBox={"0 0 500 150"}>
                <g className={"xAxis"}/>
                <g className={"yAxis"}/>
            </svg>

            <button onClick={() => setData(data.map(d => d + 5))}>update</button>
            <button onClick={() => {
                const newData = [...data]
                newData.push(Math.ceil(Math.random() * 100))
                setData(newData)
            }}>add data
            </button>
        </div>
    );
};

export default TheMuratorium5;