import React, {useState} from "react";

const UiCodeTv = () => {

    //1) Set initial data and settings

    const initialData = [
        {
            name: "Car",
            value: 10,
        },
        {
            name: "Food",
            value: 3,
        },
        {
            name: "Telephone",
            value: 9,
        },
        {
            name: "Electricity",
            value: 7,
        },
        {
            name: "Cinema",
            value: 7,
        },
    ]

    const width = 500
    const height = 150
    const padding = 20
    const maxValue = 20

    const [chartData, setChartData] = useState(initialData)

    //2) Setup random data generator and svg canvas - холст
    const newData = () => chartData.map(d => {
        return {...d, value: Math.ceil(Math.random() * maxValue)}
    })
    //3) Setup functions for Scales
    //4) Setup functions to draw Lines
    //5) Draw Line
    //6) Setup functions to draw x and y Axes
    //7) Draw x and y Axes
    return (
        <div>
            <svg id={"chart"} viewBox={"0 0 500 150"}>
                <path d={""} fill={"none"} stroke={"white"} strokeWidth={"5"}/>
            </svg>
            <p>
                <button onClick={() => setChartData(newData())}>
                    {JSON.stringify(chartData)}
                </button>
            </p>
        </div>
    );
};

export default UiCodeTv;