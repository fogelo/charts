import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";


const TheMuratorium1 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20])

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg
            .selectAll("circle").data(data)//выбери все теги circle и синхронизируй их c data
            .join("circle") // создаст столько circle сколько элементов в массиве data
            .attr("r", value => value) //когда проходится по массивам value будет значение элемента data
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2)
            .attr("stroke", "red")
    }, [data])
    return (
        <div>
            <svg ref={svgRef}>

            </svg>
            <button onClick={() => setData(data.map(value => value + 5))}>update data</button>
        </div>
    );
};

export default TheMuratorium1;