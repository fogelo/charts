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
    const xTick = d3.timeFormat("%X")

    const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.y)).range([innerHeight, 0])


    //функция, которая принимает data и вернет значение атрибута тега path
    const line = d3.line().x(d => xScale(new Date(d.x))).y(d => yScale(d.y))

    useEffect(() => {

    }, [])

    return (
        <svg height={height} width={width}>


            <g transform={`translate(${margins.left}, ${margins.top})`}>
                <path d={line(data)} fill={"none"} stroke={"blue"}/>

                {
                    xScale.ticks().map(t => {
                        return (
                            <g>
                                <line x1={xScale(t)} x2={xScale(t)} y2={innerHeight}
                                      stroke={"grey"}/>
                                <text>{}</text>
                            </g>
                        )
                    })
                }
            </g>
        </svg>
    );
};

export default MyLine;