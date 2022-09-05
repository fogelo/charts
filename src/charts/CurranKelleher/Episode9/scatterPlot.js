//это про то как создавать цепочки, которые реализованы в d3 и в jquery
import {scaleLinear, extent, axisLeft, axisBottom} from "d3"

export const scatterPlot = () => {
    let width
    let height
    let data
    let xValue
    let yValue
    let margin
    let radius

    const my = (selection) => {
        console.log(data)

        const x = scaleLinear().domain(extent(data, xValue)).range([margin.left, width - margin.right])
        const y = scaleLinear().domain(extent(data, yValue)).range([height - margin.bottom, margin.top])

        const marks = data.map(d => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
            title: `${x(xValue(d))}, ${yValue(d)}`
        }))

        selection.selectAll("circle")
            .data(marks)
            .join('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 5)
            .append('title')
            .text(d => d.title)

        selection.append("g").attr('transform', `translate(${margin.left},0)`).call(axisLeft(y)) // логика call - вызываем функцию, которую вернет axisLeft(y) и передава в нее элемент g
        selection.append("g").attr('transform', `translate(0, ${height - margin.bottom})`).call(axisBottom(x))
    }

    //здесь вместо function мы не можем использовать стрелку, так как в стрелке нет доступа к arguments
    my.width = function (_) {
        return arguments.length
            ? ((width = +_), my) // здесь вернется только то что стоит после последней запятой, остальное просто выполнится (width = _)
            : width
    }
    my.height = function (_) {
        return arguments.length
            ? ((height = +_), my)
            : height
    }
    my.data = function (_) {
        return arguments.length
            ? ((data = _), my)
            : data
    }
    my.xValue = function (_) {
        return arguments.length
            ? ((xValue = _), my)
            : xValue
    }
    my.yValue = function (_) {
        return arguments.length
            ? ((yValue = _), my)
            : yValue
    }
    my.margin = function (_) {
        return arguments.length
            ? ((margin = _), my)
            : margin
    }
    my.radius = function (_) {
        return arguments.length
            ? ((radius = _), my)
            : radius
    }

    return my
}