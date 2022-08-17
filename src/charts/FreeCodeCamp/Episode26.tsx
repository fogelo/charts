import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const csvUrl = "https://gist.githubusercontent.com/fogelo/36f9a5cec42ec7e7517f9cf308bfd5db/raw/c2332c0c1f3ab591e53be7ba5f51f7990f385fc0/week-temperature.csv"

//функции доступа, удобны тем что не нужно менять значение в нескольких местах. Все повторяющиеся куски кода нужно засовывать в функции
// это пожалуй основной принцип для написания хорошего код
const xValue = (d: any) => d.timestamp
const xAxisLabel = "Time"
const yValue = (d: any) => d.temperature
const yAxisLabel = "Temperature"

const useData = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const row = (d: any) => {
            d.temperature = +d.temperature
            d.timestamp = new Date(d.timestamp)
            return d
        }
        // @ts-ignore
        d3.csv(csvUrl, row).then((res) => {
            setData(res)
        })

    }, [])

    return data
}
const xAxisTickFormat = d3.timeFormat("%d %b")

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


const Marks = ({data, xScale, yScale}: any) =>
    <g className={"marks"}>
        {/*@ts-ignore*/}
        <path d={d3.line()
            .x((d: any) => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveNatural)(data)
        }
              fill={"none"}
              stroke={"black"}
        />
        {
            data.map((d: any) => {
                return (
                    <circle cx={xScale(xValue(d))}
                            cy={yScale(yValue(d))}
                            // r={10}
                    >
                        <title>{xAxisTickFormat(d.Population)}</title>
                    </circle>
                )
            })
        }
    </g>


const Episode26 = () => {

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
    const yScale = d3.scaleLinear().domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice()

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
                <Marks data={data} xScale={xScale} yScale={yScale} tooltipFormat={xAxisTickFormat}/>
            </g>
        </svg>
    );
};

export default Episode26;