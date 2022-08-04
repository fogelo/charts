import React from 'react';
import "./FreeCodeCamp.scss"
import * as d3 from "d3"


const FreeCodeCamp = () => {
    const width = 960
    const height = 500
    const centerX = width / 2
    const centerY = height / 2
    const strokeWidth = 20
    const eyeOffsetX = 90
    const eyeOffsetY = 100
    const eyeRadius = 40
    const mouthWidth = 20
    const mouthRadius = 140


    const mouthArc = d3.arc()
        .innerRadius(mouthRadius)
        .outerRadius(mouthRadius+mouthWidth)
        .startAngle(Math.PI / 2)
        .endAngle(3 / 2 * Math.PI);


    console.log(d3.range(5))

    return (
        <svg className={"free-code-camp-svg"} width={width} height={height}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                <circle
                    r={centerY - strokeWidth / 2}
                    fill={"grey"}
                    stroke={"black"}
                    strokeWidth={strokeWidth}
                />
                {/*<circle*/}
                {/*    cx={-eyeOffsetX}*/}
                {/*    cy={-eyeOffsetY}*/}
                {/*    r={eyeRadius}*/}
                {/*/>*/}
                {/*<circle*/}
                {/*    cx={+eyeOffsetX}*/}
                {/*    cy={-eyeOffsetY}*/}
                {/*    r={eyeRadius}*/}
                {/*/>*/}
                {/*@ts-ignore*/}
                <path d={mouthArc()}/>
            </g>
        </svg>
    );
};

export default FreeCodeCamp;