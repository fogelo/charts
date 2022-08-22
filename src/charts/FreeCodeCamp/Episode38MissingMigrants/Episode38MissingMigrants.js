import React, {useState, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {csv, scaleLinear, scaleTime, max, timeFormat, extent} from 'd3';
import {useData} from './useData';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import {Marks} from './Marks';
import * as d3 from "d3-array";

const width = 960;
const height = 500;
const margin = {top: 20, right: 30, bottom: 65, left: 90};
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

const Episode38MissingMigrants = () => {

    const threshold = 0.6

    const numbers = [
        0.7884121320131907,
        0.7947045729647857,
        0.18028893159460213,
        0.6778004508570217,
        0.8965377091081022,
        0.6223139573284711,
        0.38033641668344886,
        0.9075136288318122,
        0.2688590054692612,
        0.36128317610651095,
        0.007995260248279346,
        0.3947856702842827,
        0.9324719354865376,
    ]


    console.log(d3.extent(numbers))
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'Time';

    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';

    const xAxisTickFormat = timeFormat('%m/%d/%Y');

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                    tickOffset={5}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(${-yAxisLabelOffset},${innerHeight /
                    2}) rotate(-90)`}
                >
                    {yAxisLabel}
                </text>
                <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <Marks
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                    circleRadius={2}
                />
            </g>
        </svg>
    );
};

export default Episode38MissingMigrants
