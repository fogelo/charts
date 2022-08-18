import React from "react";

export const AxisLeft = ({yScale, innerWidth, tickOffset = -3}: any) =>
    //@ts-ignore
    yScale.ticks().map(tickValue => (
        // @ts-ignore
        <g className={"tick"}
           key={tickValue}
           transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth}/>
            <text textAnchor={"end"} dy={".32em"} x={-tickOffset}>{tickValue}</text>
        </g>
    ))