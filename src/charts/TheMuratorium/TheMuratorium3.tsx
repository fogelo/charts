import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {log} from "util";


// @ts-ignore
const TheMuratorium1 = () => {
    const svgRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 65, 75])

    useEffect(() => {

        const svg = d3.select(svgRef.current)

        const xScale = d3.scaleLinear() // говорит что масштаб у нас линейный, то есть достаточно указать только 2 значения от и до и расстояние разобется условно на равные части
            .domain([0, data.length - 1]) //задаем максимальное и минимальное значение которое у нас будет на оси x
            .range([0, 300]) // задаем от скольки до скольки пикселей растянем наш domain (можно сделать 6см и можно 6м)

        const yScale = d3.scaleLinear()
            .domain([0, 75])
            .range([150, 0])
        // В итоге xScale и yScale - это просто функции, в которые можно передать значение x или y соответственно и на выходе получить длину на которой это значение
        // расположено по факту

        // @ts-ignore
        const xAxis = d3.axisBottom(xScale) //xAxis это функция которая принимает элемент (g) и внутри него рендерит остальные элементы
            // а это path для самой оси, несколько засечек line и text для каждой из засечек
            .ticks(data.length / 2) //указываем просто колличество засечек
            // @ts-ignore
            .tickFormat(index => index + 1) //здесь мы указываем то что будет отображаться по засечками, можно указать хоть apple


        // @ts-ignore
        svg.select(".xAxis")
            .style("transform", "translateY(150px)") // смещаю ось куда мне нужно
            // @ts-ignore
            .call(xAxis)  // можно так xAxis(svg.select(".xAxis")) // вызываю функцию xAxis и передаю ей элемент (g), внутри которого хочу отрисовать элементы
        //для моей оси

        const yAxis = d3.axisRight(yScale)
        // @ts-ignore
        svg.select(".yAxis")
            .style("transform", "translateX(300px)")
            // @ts-ignore
            .call(yAxis)  // можно так xAxis(svg.select(".xAxis")

        // создаем атрибут "d" в теге path
        // @ts-ignore
        const myLine = d3.line()
            //x и y это методы переборы массива наподобие map, который мы будем потом передавать в myLine
            .x((value, index) => xScale(index)) // x - это у нас просто координата для браузера
            // @ts-ignore
            .y(yScale)  //вызовет и передаст значения внутри, тоже самое value=>yScale(value)

        //renders path element, and attaches
        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            // @ts-ignore
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data])


    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("interval")
    //         // @ts-ignore
    //         data.push(Math.random() * 70)
    //         setData([...data])
    //     }, 2000)
    // }, [])

    return (
        <div>
            <svg ref={svgRef} id={"chart"} viewBox={"0 0 500 150"}>

                <g className={"xAxis"}/>
                <g className={"yAxis"}/>

                {/*вот так строится график в ручную*/}
                {/*<path d={"M0,150 100,100 150,120"} stroke={"blue"} fill={"none"}/>*/}
                {/*<path fill={"none"} strokeWidth={"5"}/>*/}
            </svg>
        </div>
    );
};

export default TheMuratorium1;