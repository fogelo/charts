import React from 'react';

const ColorLegend = ({
                         colorScale,
                         tickSize = 10,
                         tickSpacing = 20,
                         tickTextOffset = 20,
                         onHover,
                         hoveredValue,
                         fadeOpacity
                     }: any) => {

    return colorScale.domain().map((domainValue: any, i: number) => {
        console.log(domainValue)
        return (
            <g className={"tick"}
               transform={`translate(0,${i * tickSpacing})`}
               onMouseEnter={() => onHover(domainValue)}
               onMouseOut={() => onHover(null)}
               opacity={hoveredValue && hoveredValue !== domainValue ? fadeOpacity : 1}
            >
                <circle fill={colorScale(domainValue)} r={tickSize}/>
                <text x={tickTextOffset} dy={".32em"}>{domainValue}</text>
            </g>
        )
    })


};

export default ColorLegend;