import {axisBottom, axisLeft, extent, scaleLinear, select} from "d3";

export const myScatterPlot2 = () => {
    let width
    let height
    let data
    let xValue
    let yValue
    let margin

    const my = (selection) => {
        const x = scaleLinear().domain(extent(data, xValue)).range([margin.left, width - margin.right])
        const y = scaleLinear().domain(extent(data, yValue)).range([height - margin.bottom, margin.top])

        selection.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => x(xValue(d)))
            .attr('cy', d => y(yValue(d)))
            .attr("r", 5)

        // const xAxis = axisBottom(x)
        // xAxis(svg)

        selection.append('g').attr('transform', `translate(0, ${height - margin.bottom})`).call(axisBottom(x))
        selection.append('g').attr('transform', `translate(${margin.left}, 0)`).call(axisLeft(y))
    }

    my.width = function (_) {
        return arguments.length ? ((width = _), my) : width
    }
    my.height = function (_) {
        return arguments.length ? ((height = _), my) : height
    }
    my.data = function (_) {
        return arguments.length ? ((data = _), my) : data
    }
    my.xValue = function (_) {
        return arguments.length ? ((xValue = _), my) : xValue
    }
    my.yValue = function (_) {
        return arguments.length ? ((yValue = _), my) : yValue
    }
    my.margin = function (_) {
        return arguments.length ? ((margin = _), my) : margin
    }
    return my
}