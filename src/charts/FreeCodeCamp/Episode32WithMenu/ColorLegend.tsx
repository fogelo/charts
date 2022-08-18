import React from 'react';

const ColorLegend = ({colorScale, tickSize = 10, tickSpacing = 20, tickTextOffset = 20}: any) => {

    return colorScale.domain().map((domainValue: any, i: number) => {
        console.log(domainValue)
        return (
            <g transform={`translate(0,${i * tickSpacing})`}>
                <circle fill={colorScale(domainValue)} r={tickSize}/>
                <text x={tickTextOffset} dy={".32em"}>{domainValue}</text>
            </g>
        )
    })


};

export default ColorLegend;