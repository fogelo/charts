import React, {useEffect} from 'react';
import {axisBottom, axisLeft, csv, extent, scaleLinear, select, selectAll} from "d3"
import "./MyScatterPlot.scss"
import {myScatterPlot2} from "./myScatterPlot2";

const url = "https://gist.githubusercontent.com/fogelo/014461a9020371e714de7c5fcc08ec36/raw/74b221547c56da43e10b933fa23860fe6b7e3d98/iris.csv"

const MyScatterPlot = () => {

    const rowTransform = (d) => {
        d.sepal_length = +d.sepal_length
        d.sepal_width = +d.sepal_width
        d.petal_length = +d.petal_length
        d.petal_width = +d.petal_width
        return d
    }


    const width = 500
    const height = 300
    const margin = {top: 50, right: 50, bottom: 50, left: 50}

    const xValue = (d) => d.sepal_length
    const yValue = (d) => d.sepal_width

    const svg1 = select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    const svg2 = select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    const main = async () => {
        const data = await csv(url, rowTransform)

        myScatterPlot2()
            .width(width)
            .height(height)
            .data(data)
            .xValue(xValue)
            .yValue(yValue)
            .margin(margin)(svg1)

        svg2.call(myScatterPlot2()
            .width(width)
            .height(height)
            .data(data)
            .xValue(xValue)
            .yValue(yValue)
            .margin(margin))
    }

    main()

    return (
        <div>
        </div>
    );
};

export default MyScatterPlot;