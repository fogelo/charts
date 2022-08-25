import React, {useEffect, useRef} from 'react';
import "./SolLevitt.scss"

const SolLevitt = () => {

    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        document.body.appendChild(svg)
        svg.setAttribute("width", width)
        svg.setAttribute("height", height)

        const n = 100
        for (let i = 0; i < n; i++) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', "rect")
            rect.setAttribute('x', i * 20);
            rect.setAttribute('width', 10);
            rect.setAttribute('height', height);
            rect.setAttribute("mask", "url(#mask-rect-1)")
            svg.appendChild(rect);

        }

        for (let i = 0; i < n; i++) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', "rect")
            rect.setAttribute('y', i * 20);
            rect.setAttribute('width', width);
            rect.setAttribute('height', 10);
            rect.setAttribute("mask", "url(#mask-rect-2)")
            svg.appendChild(rect);

        }

        const mask1 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
        svg.appendChild(mask1)
        mask1.setAttribute('id', "mask-rect-1");


        const maskRect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        maskRect1.setAttribute('width', width);
        maskRect1.setAttribute('height', height);
        maskRect1.setAttribute('fill', "black");
        mask1.appendChild(maskRect1);

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle1.setAttribute('cx', width / 2);
        circle1.setAttribute('cy', height / 2);
        circle1.setAttribute('r', 100);
        circle1.setAttribute('fill', "white");
        mask1.appendChild(circle1);

        const mask2 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
        svg.appendChild(mask2)
        mask2.setAttribute('id', "mask-rect-2");

        const maskRect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        maskRect2.setAttribute('width', width);
        maskRect2.setAttribute('height', height);
        maskRect2.setAttribute('fill', "white");
        mask2.appendChild(maskRect2);

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle2.setAttribute('cx', width / 2);
        circle2.setAttribute('cy', height / 2);
        circle2.setAttribute('r', 100);
        circle2.setAttribute('fill', "black");
        mask2.appendChild(circle2);

    }, [])

    return (
        <div>

        </div>
    );
};

export default SolLevitt;