import * as d3 from "d3";
import React, {useEffect, useRef} from "react";

const TheNetNinja = () => {
    const divRef = useRef(null)
    const divD3 = d3.select(divRef.current)
    useEffect(() => {
        console.log(divD3)
    }, [divD3])

    return (
        <div>
            <svg ref={divRef} width={600} height={600}>
                {/*<path d={"M150,50 L75,200 L225,200 C 225 200 200 180 150 50"} stroke={"black"} fill={"orange"}/>*/}
            </svg>
        </div>
    );
};

export default TheNetNinja;