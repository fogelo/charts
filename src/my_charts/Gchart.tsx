import React from 'react';
import * as d3 from "d3"

const Gchart = () => {




    return (
        <div className={"g-wrapper"}>
            <svg>
                <path d={"M0,0 L100 100"} stroke={"black"}/>
                <g className={'g-chart'}>
                    <path d={"M0,0 L100 100"} stroke={"black"}/>
                </g>
            </svg>
        </div>
    );
};

export default Gchart;