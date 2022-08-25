import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import signal from "../../../data/siganl"

const MyLine = () => {

    const data = signal

    const height = 400
    const width = 900
    const margins = {top: 50, right: 50, bottom: 50, left: 50}

    const innerWidth = width - margins.left - margins.right
    const innerHeight = height - margins.top - margins.bottom





    //функция, которая принимает data и вернет значение атрибута тега path
    // let line = d3.line().x(d => xScale(new Date(d.x))).y(d => yScale(d.y))

    // id для clip-path (нужен чтобы обрезать линию за пределами области графика)
    const id = "ZoomableLineChart"

    const svgRef = useRef()
    const gRef = useRef()
    const axisBottomRef = useRef();
    const axisLeftRef = useRef();


    const [currentZoomState, setCurrentZoomState] = useState()
    console.log(currentZoomState)
    useEffect(() => {

        const svg = d3.select(svgRef.current)
        const g = d3.select(gRef.current)

        const axisBottom = d3.select(axisBottomRef.current)
        const axisLeft = d3.select(axisLeftRef.current)

        const xScale = d3.scaleLinear().domain(d3.extent(data, d => new Date(d.x))).range([0, innerWidth])
        const xAxisTickFormat = d3.timeFormat("%m/%d/%Y")

        const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.y)).range([innerHeight, 0])

        //Условие для изменения размеров если исходный масштаб был изменен
        if (currentZoomState) {
            const newXScale = currentZoomState.rescaleX(xScale)
            xScale.domain(newXScale.domain())
        }


        const line = d3.line().x(d => xScale(new Date(d.x))).y(d => yScale(d.y))


        //Создаем тег path
        g
            .selectAll(".line-chart")
            .data([data])
            .join("path")
            .attr("class", "line-chart")
            .attr("stroke", "#025EA1")
            .attr("fill", "none")
            .attr("d", line)



        const xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickFormat((value) => new Date(value).toLocaleDateString())

        axisBottom
            .style("transform", `translateY(${innerHeight}px)`)
            .call(xAxis)

        const yAxis = d3.axisLeft(yScale)
            .ticks(5)

        axisLeft
            .call(yAxis)

        // Настраиваем масштабирование (zoom)
        const zoomBehavior = d3.zoom()
            .scaleExtent([0.5, 200])
            .translateExtent([
                [0, 0], [width, height]
            ])
            .on("zoom", () => {
                const zoomState = d3.zoomTransform(svg.node())
                setCurrentZoomState(zoomState)
            })

        svg.call(zoomBehavior)


    }, [currentZoomState, data])


    return (
        <svg height={height} width={width} ref={svgRef}>
            <g transform={`translate(${margins.left}, ${margins.top})`} ref={gRef}>
                <g ref={axisBottomRef}/>
                <g ref={axisLeftRef}/>
            </g>
        </svg>
    );
};

export default MyLine;