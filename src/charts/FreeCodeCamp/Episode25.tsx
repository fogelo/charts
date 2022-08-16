import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const csvUrl = "https://gist.githubusercontent.com/fogelo/014461a9020371e714de7c5fcc08ec36/raw/74b221547c56da43e10b933fa23860fe6b7e3d98/iris.csv"

//функции доступа, удобны тем что не нужно менять значение в нескольких местах. Все повторяющиеся куски кода нужно засовывать в функции
// это пожалуй основной принцип для написания хорошего код
const xValue = (d: any) => d.sepal_length
const xAxisLabel = "Sepal Length"
const yValue = (d: any) => d.sepal_width
const yAxisLabel = "Sepal Width"

const useData = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const row = (d: any) => {
            d.sepal_length = +d.sepal_length
            d.sepal_width = +d.sepal_width
            d.petal_length = +d.petal_length
            d.petal_width = +d.petal_width
            d.species = +d.species
            return d
        }
        // @ts-ignore
        d3.csv(csvUrl, row).then((res) => {
            setData(res)
        })

    }, [])

    return data
}
const siFormat = d3.format(".2s")
const xAxisTickFormat = (tickValue: any) => siFormat(tickValue).replace("G", "B")

const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 10}: any) =>
    //@ts-ignore
    xScale.ticks().map(tickValue => (
        <g className={"tick"} key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke={"black"}/>
            <text y={innerHeight + tickOffset} dy={".71em"} textAnchor={"middle"}>
                {
                    tickFormat(tickValue)
                }
            </text>
        </g>
    ))


const AxisLeft = ({yScale, innerWidth, tickOffset = -3}: any) =>
    //@ts-ignore
    yScale.ticks().map(tickValue => (
        // @ts-ignore
        <g className={"tick"} key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth}/>
            <text textAnchor={"end"} dy={".32em"} x={tickOffset}>{tickValue}</text>
        </g>
    ))


const Bars = ({data, xScale, yScale}: any) =>
    data.map((d: any) => {
        return (
            <circle className={"bar"}
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={10}
            >
                <title>{xAxisTickFormat(d.Population)}</title>
            </circle>
        )
    })

const Episode25 = () => {

    const width = 960
    const height = 400
    const margin = {top: 20, right: 30, bottom: 60, left: 90}
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.right - margin.left

    const data = useData()

    if (!data) {
        return <div>Loading</div>
    }

    const countries = data.map((d: any) => d.Country).slice(0, 10)

    // @ts-ignore
    //d3.extent(data, xValue) вместо d3.min(data, xValue), d3.max(data, xValue)
    const xScale = d3.scaleLinear().domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice()
    // @ts-ignore
    const yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([0, innerHeight])

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
                <text className={"axis-label"}
                      x={innerWidth / 2}
                      y={innerHeight + 50}
                      textAnchor={"middle"}
                >
                    {xAxisLabel}
                </text>
                <text className={"axis-label"}
                      transform={`translate(-40, ${innerHeight / 2}) rotate(-90)`}
                      textAnchor={"middle"}
                >
                    {yAxisLabel}
                </text>
                <Bars data={data} xScale={xScale} yScale={yScale} tooltipFormat={xAxisTickFormat}/>
            </g>
        </svg>
    );
};

export default Episode25;