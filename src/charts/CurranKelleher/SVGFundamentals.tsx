import React from 'react';
import "./SVGFundamentals.scss"

const SvgFundamentals = () => {
    return (
        <svg>
            <rect x={100} y={100} width={200} height={200} fill={"grey"}/>
            <path d="m100 100 l200 200 l300 300" stroke={"blue"}/>
        </svg>
    );
};

export default SvgFundamentals;