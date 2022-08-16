import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const csvUrl = "https://gist.githubusercontent.com/fogelo/6c7f8a44911a1640b52579d6998f82d9/raw/a6cc67d27005e324e2c7956aca6764b444dd692a/population"

//функции доступа, удобны тем что не нужно менять значение в нескольких местах. Все повторяющиеся куски кода нужно засовывать в функции
// это пожалуй основной принцип для написания хорошего код
const xValue = (d: any) => d.Population
const yValue = (d: any) => d.Country


const useData = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const row = (d: any) => {
            d.Population = +d["2020"] * 1000
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

const AxisBottom = ({xScale, innerHeight, tickFormat}: any) =>
    //@ts-ignore
    xScale.ticks().map(tickValue => (
        <g className={"tick"} key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke={"black"}/>
            <text y={innerHeight + 3} dy={".71em"} textAnchor={"middle"}>
                {
                    tickFormat(tickValue)
                }
            </text>
        </g>
    ))


const AxisLeft = ({yScale}: any) =>
    //@ts-ignore
    yScale.domain().map(value => (
        // @ts-ignore
        <g className={"tick"} key={value} transform={`translate(0, ${yScale(value) + yScale.bandwidth() / 2})`}>
            <text textAnchor={"end"} dy={".32em"} x={-3}>{value}</text>
        </g>
    ))


const Bars = ({data, xScale, yScale}: any) =>
    data.map((d: any) => {
        return (
            <rect className={"bar"} key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)}
                  height={yScale.bandwidth()}
            >
                <title>{xAxisTickFormat(d.Population)}</title>
            </rect>
        )
    })

const Episode21 = () => {

    const width = 960
    const height = 400
    const margin = {top: 20, right: 30, bottom: 60, left: 220}
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.right - margin.left

    const data = useData()

    if (!data) {
        return <div>Loading</div>
    }

    const countries = data.map((d: any) => d.Country).slice(0, 10)
    const yScale = d3.scaleBand().domain(countries).range([0, innerHeight]).paddingInner(0.2)
    // @ts-ignore
    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Population)]).range([0, innerWidth])
    console.log(data)
    console.log(countries)
    // console.log(xScale.ticks())
    console.log(yScale.domain())
    // @ts-ignore

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                <AxisLeft yScale={yScale}/>
                <text className={"axis-label"} x={innerWidth / 2} textAnchor={"middle"}
                      y={innerHeight + 50}>Population
                </text>
                <Bars data={data} xScale={xScale} yScale={yScale} tooltipFormat={xAxisTickFormat}/>
            </g>
        </svg>
    );
};

export default Episode21;