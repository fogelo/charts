import React from 'react';
import {scatterPlot} from "./scatterPlot";
import * as d3 from "d3";

const ScatterPlot2 = () => {
    const csvURL = [
        "https://gist.githubusercontent.com/",
        "fogelo/",                                      //user
        "014461a9020371e714de7c5fcc08ec36/",            //gist id
        "raw/",
        "74b221547c56da43e10b933fa23860fe6b7e3d98/",    //commit
        "iris.csv"                                      //file name
    ].join('')

    const {csv, select} = d3

    const parseRow = d => {
        d.sepal_length = +d.sepal_length
        d.sepal_width = +d.sepal_width
        d.petal_length = +d.petal_length
        d.petal_width = +d.petal_width
        return d
    }

    const xValue = d => d.petal_length
    const yValue = d => d.sepal_length

    const margin = {top: 50, right: 50, bottom: 50, left: 50}

    const width = window.innerWidth
    const height = window.innerHeight

    const radius = 5

    const svg = select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    const main = async () => {
        const data = await csv(csvURL, parseRow)
        svg.call(scatterPlot()
            .width(width)
            .height(height)
            .data(data)
            .xValue(d => d.petal_length)
            .yValue(d => d.sepal_length)
            .margin({top: 50, right: 50, bottom: 50, left: 50})
            .radius(5))
    }
    main()

    return (
        <div>

        </div>
    );
};

export default ScatterPlot2;