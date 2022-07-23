import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

const TheMuratorium = () => {
    const svgRef = useRef(null)
    useEffect(() => {
        const svg = d3.select(svgRef.current)
    }, [])
    return (
        <div>
            <svg ref={svgRef}>

            </svg>
        </div>
    );
};

export default TheMuratorium;