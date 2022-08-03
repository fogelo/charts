import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {zoomTransform} from "d3";


// @ts-ignore
const TheMuratorium16 = () => {
    const svgRef = useRef(null)
    const wrapperRef = useRef(null)
    const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 65, 75])
    const [currentZoomState, setCurrentZoomState] = useState(null)
    // const horizontalOffset = 100
    const id = "ZoomableLineChart"


    useEffect(() => {
        const svg = d3.select(svgRef.current)
        const svgContent = svg.select(".content")
        console.log(svg.node())
        // @ts-ignore
        const width = wrapperRef.current.offsetWidth
        // @ts-ignore
        const height = wrapperRef.current.offsetHeight
        // @ts-ignore
        const paddingLeft = parseInt(getComputedStyle(wrapperRef.current).paddingLeft)
        // @ts-ignore
        const paddingRight = parseInt(getComputedStyle(wrapperRef.current).paddingRight)

        const xScale = d3.scaleLinear() // говрит что масштаб у нас линейный, то есть достаточно указать только 2 значения от и до и расстояние разобется условно на равные части
            .domain([0, data.length - 1]) //задаем максимальное и минимальное значение которое у нас будет на оси x
            // @ts-ignore
            .range([0, width - paddingLeft - paddingRight]) // задаем от скольки до скольки пикселей растянем наш domain (можно сделать 6см и можно 6м)

        if (currentZoomState) {
            // @ts-ignore
            const newXScale = currentZoomState.rescaleX(xScale)
            xScale.domain(newXScale.domain())
        }


        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])
        // В итоге xScale и yScale - это просто функции, в которые можно передать значение x или y соответственно и на выходе получить длину на которой это значение
        // расположено по факту

        // @ts-ignore
        const xAxis = d3.axisBottom(xScale) //xAxis это функция которая принимает элемент (g) и внутри него рендерит остальные элементы
            // а это path для самой оси, несколько засечек line и text для каждой из засечек
            .ticks(data.length / 2) //указываем просто колличество засечек
            // @ts-ignore
            .tickFormat(index => index + 1) //здесь мы указываем то что будет отображаться по засечками, можно указать хоть apple


        // @ts-ignore
        svg.select(".x-axis")
            .style("transform", `translateY(${height}px)`) // смещаю ось куда мне нужно
            // @ts-ignore
            .call(xAxis)  // можно так xAxis(svg.select(".xAxis")) // вызываю функцию xAxis и передаю ей элемент (g), внутри которого хочу отрисовать элементы
        //для моей оси

        const yAxis = d3.axisLeft(yScale)
        // @ts-ignore
        svg.select(".y-axis")
            // @ts-ignore
            .call(yAxis)  // можно так xAxis(svg.select(".xAxis")

        // создаем атрибут "d" в теге path
        // @ts-ignore
        const lineGenerator = d3.line()
            //x и y это методы переборы массива наподобие map, который мы будем потом передавать в myLine
            .x((value, index) => xScale(index)) // x - это у нас просто координата для браузера
            // @ts-ignore
            .y(yScale)  //вызовет и передаст значения внутри, тоже самое value=>yScale(value)

        //renders path element, and attaches
        svgContent
            .selectAll(".line-chart")
            .data([data])
            .join("path")
            .attr("class", "line-chart")
            .attr("stroke", "blue")
            .attr("fill", "none")
            // @ts-ignore
            .attr("d", lineGenerator)


        // масштабирование
        const zoomBehavior = d3.zoom()
            .scaleExtent([0.5, 5])
            .translateExtent([
                [0, 0], [width, height]
            ])
            .on("zoom", () => {
                console.log("zoomed!")
                // @ts-ignore
                const zoomState = zoomTransform(svg.node())
                // @ts-ignore
                setCurrentZoomState(zoomState)
            })

        // @ts-ignore
        svg.call(zoomBehavior)

    }, [currentZoomState, data])


    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("interval")
    //         // @ts-ignore
    //         data.push(Math.random() * 70)
    //         setData([...data])
    //     }, 2000)
    // }, [])

    return (
        <>
            <div ref={wrapperRef} style={{marginBottom: "2rem"}}  className={"wrapper16"}>
                <svg ref={svgRef}>
                    <defs>
                        <clipPath id={id}>
                            <rect x="0" y="0" width="100%" height="100%"/>
                        </clipPath>
                    </defs>
                    <g className="content" clipPath={`url(#${id})`}></g>
                    <g className="x-axis"/>
                    <g className="y-axis"/>
                </svg>
            </div>
            <button></button>
        </>
    );
};

export default TheMuratorium16;