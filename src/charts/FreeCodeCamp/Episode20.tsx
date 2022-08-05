import React, {useEffect, useState} from 'react';
import * as d3 from "d3"
import {DSVRowArray} from "d3";

const csvUrl = "https://gist.githubusercontent.com/fogelo/bddb08e85940ed5fd52c61ba70b8e321/raw/5c944b180e0fd0e1d075e0f87e58ec64dfe7154d/colors%2520from%2520mdn"

const Episode20 = () => {
    const width = 960
    const height = 500
    const [data, setData] = useState<DSVRowArray<string> | null>(null)

    const data2 = [
        {value: 1, color: "green"},
        {value: 2, color: "blue"},
        {value: 3, color: "red"},
        {value: 4, color: "black"},
        {value: 5, color: "purple"},
    ]
    //@ts-ignore
    const colorsData2 = d3.pie().value(d => d.value)(data2)
    console.log(colorsData2)

    const pieArc = d3.arc()
    //@ts-ignore
    const colorsData = data && d3.pie().value(1)(data)

    useEffect(() => {
        d3.csv(csvUrl).then((res) => {
            setData(res)
        })

    }, [])

    return (
        <svg width={width} height={height} className={"episode20-svg"}>
            {/*{*/}
            {/*    data?.map(c => <div style={{backgroundColor: c.code, width: "10px", height: "10px"}}></div>)*/}
            {/*}*/}
            <g transform={`translate(${width / 7}, ${height / 2})`}>
                {/*для потомков оставил, можно воспользоваться d3.pie котороый автоматически вычислит startAngle и  end Angle*/}
                {
                    //@ts-ignore
                    data?.map((c, i) => <path fill={c.code} d={pieArc({
                        innerRadius: 90,
                        outerRadius: 100,
                        startAngle: 2 * Math.PI / data?.length * i,
                        endAngle: 2 * Math.PI / data?.length * (i + 1)
                    })}
                    />)
                }
            </g>
            <g transform={`translate(${width / 4}, ${height / 2})`}>
                {/*более простой метод, чтобы не высчитывать начальный и конечный углы*/}
                {
                    //@ts-ignore
                    colorsData?.map((d, i) => <path fill={d.data.code} d={pieArc({
                        innerRadius: 90,
                        outerRadius: 100,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    })}
                    />)
                }
            </g>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {/*более простой метод, чтобы не высчитывать начальный и конечный углы*/}
                {
                    // @ts-ignore
                    colorsData2.map((d, i) => <path fill={d.data.color} d={pieArc({
                        innerRadius: 90,
                        outerRadius: 100,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    })}
                    />)
                }
            </g>
        </svg>
    );
};

export default Episode20;