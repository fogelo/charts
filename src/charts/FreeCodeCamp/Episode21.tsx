import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const Episode21 = () => {

    const width = 960
    const height = 400
    const margin = {top: 20, right: 20, bottom: 20, left: 20}
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.right - margin.left


    const csvUrl = "https://gist.githubusercontent.com/fogelo/6c7f8a44911a1640b52579d6998f82d9/raw/a6cc67d27005e324e2c7956aca6764b444dd692a/population"

    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const row = (d: any) => {
            d.Population = +d["2020"]
            return d
        }
        // @ts-ignore
        d3.csv(csvUrl, row).then((res) => {
            setData(res)
        })

    }, [])

    if (!data) {
        return <div>Loading</div>
    }

    const countries = data.map((d: any) => d.Country).slice(0, 10)
    const yScale = d3.scaleBand().domain(countries).range([0, innerHeight])
    // @ts-ignore
    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Population)]).range([0, innerWidth])
    console.log(data)
    console.log(countries)


    // @ts-ignore
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {
                    data.map((d: any, i: any) => {
                        return (
                            <rect key={i} x={0} y={yScale(d.Country)} width={xScale(d.Population)}
                                  height={yScale.bandwidth()}/>
                        )
                    })
                }
            </g>
        </svg>
    );
};

export default Episode21;