import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {index, transition} from "d3";


// @ts-ignore
const TheMuratorium4 = () => {
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
            .attr("fill", colorScale)
            .style("transform", "scale(1,-1") // переворвчивает столбики, чтобы анимация была правильная
            // @ts-ignore
            .attr("x", (value, index) => {
                // @ts-ignore
                console.log(xScale.bandwidth())
                // @ts-ignore
                return xScale(index)
            })
            .attr("y", -150)
            .attr("width", xScale.bandwidth())//bandwidth вернут ширину каждого столбика
            .transition()
            .attr("height", value => 150 - yScale(value))
    }, [data])


    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("interval")
    //         setData(data.map(value => value * Math.random() * 1))
    //     }, 2000)
    // }, [])


    return (
        <div>
            <svg ref={svgRef} id={"chart"} viewBox={"0 0 500 150"}>

                <g className={"xAxis"}/>
                <g className={"yAxis"}/>

                {/*вот так строится график в ручную*/}
                {/*<path d={"M0,150 100,100 150,120"} stroke={"blue"} fill={"none"}/>*/}
                {/*<path fill={"none"} strokeWidth={"5"}/>*/}
            </svg>

            <button onClick={() => setData(data.map(d => d + 5))}>update</button>
        </div>
    );
};

export default TheMuratorium4;