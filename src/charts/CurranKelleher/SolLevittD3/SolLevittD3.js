import React, {useEffect, useRef} from 'react';
import "./SolLevittD3.scss"
import * as d3 from "d3"


const SolLevittD3 = () => {

    useEffect(() => {

        const width = window.innerWidth
        const height = window.innerHeight

        /*Создание svg - Vanilla*/
        // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        // document.body.appendChild(svg)
        // svg.setAttribute("width", width)
        // svg.setAttribute("height", height)

        /*Создание svg - d3*/
        const svg = d3.select(".App")
            .append("svg")
            .attr("width", width)
            .attr("height", height)


        // const n = 100
        // for (let i = 0; i < n; i++) {
        //     const rect = document.createElementNS('http://www.w3.org/2000/svg', "rect")
        //     rect.setAttribute('x', i * 20);
        //     rect.setAttribute('width', 10);
        //     rect.setAttribute('height', height);
        //     rect.setAttribute("mask", "url(#mask-rect-1)")
        //     svg.appendChild(rect);
        // }


        /* Можно вот так добавить прямоугольники */
        // const n = 100
        // const marks = []
        // for (let i = 0; i < n; i++) {
        //     marks.push({
        //         x: i * 20,
        //         width: 10,
        //         height: height,
        //         mask: "url(#mask-rect-1)"
        //     })
        // }
        //
        // svg.selectAll("rect").data(marks).join("rect")
        //     .attr("x", d => d.x)
        //     .attr("width", d => d.width)
        //     .attr("height", d => d.height)
        //     .attr("mask", d => d.mask)
        //     .attr("fill", "#c0c0bb")

        /*А можно немного по другому*/
        // const n = 100
        // svg.selectAll("rect.vertical").data(d3.range(n)).join("rect")
        //     .attr("x", d => d * 20)
        //     .attr("width", 10)
        //     .attr("height", height)
        //     .attr("class", "vertical")
        //     .attr("mask", "url(#mask-1)")
        //     .attr("fill", "#c0c0bb")
        //
        //
        // svg.selectAll("rect.horizontal").data(d3.range(n)).join("rect")
        //     .attr("y", d => d * 20)
        //     .attr("width", width)
        //     .attr("height", 10)
        //     // .attr("class", "horizontal")
        //     .attr("mask", "url(#mask-2)")
        //     .attr("fill", "#c0c0bb")


        /*Чтобы не было косяка связанного с selectAll и join (enter, update, exit) можно разделять элементы с помощью классов как сделано выше
        * или можно просто группровать элементы тегом <g> как сделано ниже
        * */
        const n = 100
        svg.append("g")
            .selectAll("rect").data(d3.range(n)).join("rect")
            .attr("x", d => d * 20)
            .attr("width", 10)
            .attr("height", height)
            .attr("mask", "url(#mask-1)")
            .attr("fill", "#c0c0bb")


        svg.append("g")
            .selectAll("rect").data(d3.range(n)).join("rect")
            .attr("y", d => d * 20)
            .attr("width", width)
            .attr("height", 10)
            .attr("mask", "url(#mask-2)")
            .attr("fill", "#c0c0bb")


        // for (let i = 0; i < n; i++) {
        //     const rect = document.createElementNS('http://www.w3.org/2000/svg', "rect")
        //     rect.setAttribute('y', i * 20);
        //     rect.setAttribute('width', width);
        //     rect.setAttribute('height', 10);
        //     rect.setAttribute("mask", "url(#mask-rect-2)")
        //     svg.appendChild(rect);
        //
        // }


        /*Создание маски - Vanilla*/
        // const mask1 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
        // svg.appendChild(mask1)
        // mask1.setAttribute('id', "mask-rect-1");
        //
        // const maskRect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        // maskRect1.setAttribute('width', width);
        // maskRect1.setAttribute('height', height);
        // maskRect1.setAttribute('fill', "black");
        // mask1.appendChild(maskRect1);
        //
        // const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        // circle1.setAttribute('cx', width / 2);
        // circle1.setAttribute('cy', height / 2);
        // circle1.setAttribute('r', 100);
        // circle1.setAttribute('fill', "white");
        // mask1.appendChild(circle1);
        //
        // const mask2 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
        // svg.appendChild(mask2)
        // mask2.setAttribute('id', "mask-rect-2");

        // const maskRect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        // maskRect2.setAttribute('width', width);
        // maskRect2.setAttribute('height', height);
        // maskRect2.setAttribute('fill', "white");
        // mask2.appendChild(maskRect2);
        //
        // const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        // circle2.setAttribute('cx', width / 2);
        // circle2.setAttribute('cy', height / 2);
        // circle2.setAttribute('r', 100);
        // circle2.setAttribute('fill', "black");
        // mask2.appendChild(circle2);

        /*Создание маски - d3*/
        const mask = svg.append("mask").attr("id", "mask-1")

        mask.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "white")

        mask.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", 100)
            .attr("fill", "black")

        const mask2 = svg.append("mask").attr("id", "mask-2")

        mask2.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "black")

        mask2.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", 100)
            .attr("fill", "white")


    }, [])

    return (
        <div>

        </div>
    );
};

export default SolLevittD3;