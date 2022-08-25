import React, {useEffect, useRef} from 'react';
import "./SolLevittD3.scss"
import * as d3 from "d3"


const SolLevittD3 = () => {

    useEffect(() => {

        const width = window.innerWidth
        const height = window.innerHeight

        const svg = d3.select(".App")
            .append("svg")
            .attr("width", width)
            .attr("height", height)


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


        const renderMask = (selection, maskId, inverted) => {
            const mask = selection.append("mask").attr("id", maskId)

            mask.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", inverted ? "black" : "white")

            mask
                .selectAll("g")
                .data(d3.range(d3.symbols.length))
                .join(enter => {
                    enter
                        .append('g')
                        .attr("transform", d => `translate(${d * 100}, ${height / 2})`)
                        .append('path')
                        .attr('d', d => d3.symbol(d3.symbols[d], 5000)())
                        .attr("fill", inverted ? "white" : "black")
                })
        }

        /*Эта запись аналогична...*/
        // renderMask(svg, "mask-1", false)
        // renderMask(svg, "mask-2", true)

        /*...этой записи*/
        // svg.call(renderMask, "mask-1", false)
        // svg.call(renderMask, "mask-2", true)

        /* и этой*/
        svg
            .call(renderMask, "mask-1", false)
            .call(renderMask, "mask-2", true)

    }, [])

    return (
        <div>

        </div>
    );
};

export default SolLevittD3;