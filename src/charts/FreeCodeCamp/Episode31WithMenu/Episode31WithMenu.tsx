import React, {useState} from "react";
import * as d3 from "d3";
import {AxisBottom} from "./AxisBottom";
import {AxisLeft} from "./AxisLeft";
import {useData} from "./useData";
import {Marks} from "./Marks";
import DropdownEp30 from "./DropdownEp30";

const width = 960
const menuHeight = 75
const height = 500 - menuHeight
const margin = {top: 20, right: 30, bottom: 65, left: 90}
const xAxisLabelOffset = 50
const yAxisLabelOffset = 45

const attributes = [
    {value: "sepal_length", label: "Sepal Length"},
    {value: "sepal_width", label: "Sepal Width"},
    {value: "petal_length", label: "Petal Length"},
    {value: "petal_width", label: "Petal Width"},
    {value: "species", label: "Species"},
]

const getLabel = (value: any) => {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].value === value) {
            return attributes[i].label
        }
    }
}


const Episode31WithMenu = () => {
    const data = useData()

    const initialXAttribute = 'petal_length'
    const [xAttribute, setXAttribute] = useState(initialXAttribute)
    const xValue = (d: any) => d[xAttribute]
    const xAxisLabel = getLabel(xAttribute)

    const initialYAttribute = 'petal_width'
    const [yAttribute, setYAttribute] = useState(initialYAttribute)
    const yValue = (d: any) => d[yAttribute]
    const yAxisLabel = getLabel(yAttribute)


    if (!data) {
        return <div>Loading</div>
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.right - margin.left
    const siFormat = d3.format(".2s")
    const xAxisTickFormat = (tickValue: any) => siFormat(tickValue).replace("G", "B")

    // @ts-ignore
    const xScale = d3.scaleLinear().domain(d3.extent(data, xValue)).range([0, innerWidth]).nice()

    // @ts-ignore
    const yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([0, innerHeight])

    return (
        <>
            <div>
                <label htmlFor={"x-select"}>X:</label>
                <DropdownEp30 options={attributes}
                              id={"x-select"}
                              selectedValue={xAttribute}
                              onSelectedValueChange={setXAttribute}/>

                <label htmlFor={"y-select"}>X:</label>
                <DropdownEp30 options={attributes}
                              id={"y-select"}
                              selectedValue={yAttribute}
                              onSelectedValueChange={setYAttribute}/>
            </div>

            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={5}/>
                    <text className={"axis-label"}
                          textAnchor={"middle"}
                          x={innerWidth / 2}
                          y={innerHeight + xAxisLabelOffset}
                    >
                        {xAxisLabel}
                    </text>

                    <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
                    <text className={"axis-label"}
                          textAnchor={"middle"}
                          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                    >
                        {yAxisLabel}
                    </text>
                    <Marks data={data}
                           xScale={xScale}
                           yScale={yScale}
                           xValue={xValue}
                           yValue={yValue}
                           tooltipFormat={xAxisTickFormat}
                           circleRadius={7}
                    />
                </g>
            </svg>
        </>
    );
};

export default Episode31WithMenu;