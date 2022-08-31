import React, {useEffect} from 'react';
import * as d3 from "d3"


//В конце пятого эпизода рассказывает как работе call (преимущество в том что мы с помощью call можем строить цепочки)
const Selections = () => {

    const width = window.innerWidth
    const height = window.innerHeight

    const data = d3.range(15)
    console.log(Math.sin(1.7))
    useEffect(() => {

        const svg = d3.select('body')
            .append('svg')
            .attr("width", width)
            .attr("height", height)

        let t = 0
        setInterval(() => {
            svg.selectAll('circle')
                .data(data)
                .join('circle')
                .attr("r", d => Math.abs(Math.sin(d * 0.5 + t) * 15))
                .attr("cx", d => d * 50 + 50)
                .attr("cy", d => 200 + Math.sin(d * 0.5 + t) * 100)
            t = t + 0.005
        }, 1000 / 120)

    }, [width])

    return (
        <div>

        </div>
    );
};

export default Selections;