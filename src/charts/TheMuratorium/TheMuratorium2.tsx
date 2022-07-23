import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";


const TheMuratorium1 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20])

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        // @ts-ignore
        const myLine = d3.line()
            //x и y это методы переборы массива наподобие map, который мы будем потом передавать в myLine
            .x((value, index) => index * 50)
            .y(value => value)


            svg
                .selectAll("path")
                .data([data])
                .join("path")
                // @ts-ignore
                .attr("d", value => myLine(value))
                .attr("fill", "none")
                .attr("stroke", "blue")
        }, [data])

    return (
        <div>
            <svg ref={svgRef} id={"chart"} viewBox={"0 0 500 150"}>
                {/*вот так строится график в ручную*/}
                {/*<path d={"M0,150 100,100 150,120"} stroke={"blue"} fill={"none"}/>*/}
                {/*<path fill={"none"} strokeWidth={"5"}/>*/}
            </svg>
        </div>
    );
};

export default TheMuratorium1;