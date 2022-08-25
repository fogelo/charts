import React from 'react';
import "./MyGradient.scss"


const MyGradient = () => {
    return (
        <div>
            <svg>
                <linearGradient id={"my-gradient-1"}>
                    <stop offset={"0"} stopColor={"white"}></stop>
                    <stop offset={"1"} stopColor={"red"}></stop>
                </linearGradient>

                <radialGradient id={"my-radial-gradient-1"}>
                    <stop offset={"0"} stopColor={"blue"}></stop>
                    <stop offset={"1"} stopColor={"white"}></stop>
                </radialGradient>

                <radialGradient id={"my-radial-gradient-2"}>
                    <stop offset={"0"} stopOpacity={"1"}></stop>
                    <stop offset={"1"} stopOpacity={"0"}></stop>
                </radialGradient>

                <rect width={100} height={100} fill={"url(#my-gradient-1)"}></rect>
                <rect x={100} width={100} height={100} fill={"url(#my-radial-gradient-1)"}></rect>
                <rect x={200} width={100} height={100} fill={"url(#my-radial-gradient-2)"}></rect>
            </svg>
        </div>
    );
};

export default MyGradient;