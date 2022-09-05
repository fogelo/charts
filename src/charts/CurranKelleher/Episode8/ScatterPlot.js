import React from 'react';
import * as d3 from "d3"
import './ScatterPlot.scss'

const ScatterPlot = () => {

    const csvURL = [
        "https://gist.githubusercontent.com/",
        "fogelo/",                                      //user
        "014461a9020371e714de7c5fcc08ec36/",            //gist id
        "raw/",
        "74b221547c56da43e10b933fa23860fe6b7e3d98/",    //commit
        "iris.csv"                                      //file name
    ].join('')

    const {csv, select, scaleLinear, extent, axisLeft, axisBottom} = d3

    const parseRow = d => {
        d.sepal_length = +d.sepal_length
        d.sepal_width = +d.sepal_width
        d.petal_length = +d.petal_length
        d.petal_width = +d.petal_width
        return d
    }

    // csv(csvURL, parseRow).then(res => {
    //     console.log(res)
    // })

    const xValue = d => d.petal_length
    const yValue = d => d.sepal_length

    const margin = {top: 50, right: 50, bottom: 50, left: 50}

    const width = window.innerWidth
    const height = window.innerHeight

    const radius = 5

    const main = async () => {
        const data = await csv(csvURL, parseRow)
        //Какие координаты дожна получить точка на основе данных    //domain - это диапазон данных от минимального до максимального //range - это диапазон внутри svg холста

        // const x = scaleLinear().domain([d3.min(data, xValue), d3.max(data, xValue])
        const x = scaleLinear().domain(extent(data, xValue)).range([margin.left, width - margin.right])
        console.log(x.domain())
        console.log(x.range())

        const y = scaleLinear().domain(extent(data, yValue)).range([height - margin.bottom, margin.top]) // от 0 до height а не наооборот так как на svg холсте координата y=0 находится вверху

        const marks = data.map(d => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
            title: `${x(xValue(d))}, ${yValue(d)}`

        }))

        const svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.selectAll("circle")
            .data(marks)
            .join('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', radius)
            .append('title')
            .text(d => d.title)


        svg.append("g").attr('transform', `translate(${margin.left},0)`).call(axisLeft(y)) // логика call - вызываем функцию, которую вернет axisLeft(y) и передава в нее элемент g

        svg.append("g").attr('transform', `translate(0, ${height - margin.bottom})`).call(axisBottom(x)) // логика call - вызываем функцию, которую вернет axisLeft(y) и передава в нее элемент g


    }


    main()

    return (
        <div>

        </div>
    );
};

export default ScatterPlot;