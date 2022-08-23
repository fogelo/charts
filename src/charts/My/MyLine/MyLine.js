import React, {useEffect} from 'react';
import * as d3 from "d3";
import signal from "../../../data/siganl"

const MyLine = () => {

    const data = signal

    const height = 400
    const width = 900
    const margins = {top: 50, right: 50, bottom: 50, left: 50}

    const innerWidth = width - margins.left - margins.right
    const innerHeight = height - margins.top - margins.bottom


    const xScale = d3.scaleLinear().domain(d3.extent(data, d => new Date(d.x))).range([0, innerWidth]).nice()
    const xAxisTickFormat = d3.timeFormat("%m/%d/%Y")

    const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.y)).range([innerHeight, 0]).nice()


    //функция, которая принимает data и вернет значение атрибута тега path
    const line = d3.line().x(d => xScale(new Date(d.x))).y(d => yScale(d.y))

    useEffect(() => {

    }, [])

    return (
        <svg height={height} width={width}>


            <g transform={`translate(${margins.left}, ${margins.top})`}>
                <path d={line(data)} fill={"none"} stroke={"blue"}/>

                {/*ось X*/}
                {
                    xScale.ticks().map(t => {
                        return (
                            <g key={t} transform={`translate(${xScale(t)}, 0)`}>
                                <line y2={innerHeight}
                                      stroke={"grey"}/>
                                <text y={innerHeight + 10} dy={".71em"} textAnchor={"middle"}>{xAxisTickFormat(t)}</text>
                            </g>
                        )
                    })
                }

                {/*ось Y*/}

                {
                    yScale.ticks().map(t => {
                        return (
                            <g key={t} transform={`translate(0, ${yScale(t)})`}>
                                <line x2={innerWidth}
                                      stroke={"grey"}/>
                                <text x={-5} dy={"3"} textAnchor={"end"}>{t}</text>
                            </g>
                        )
                    })
                }

            </g>
        </svg>
    );
};

export default MyLine;