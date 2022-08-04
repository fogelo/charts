import React, {MouseEvent, useState} from 'react';
import * as d3 from "d3"
const MouseMove = () => {
    const width = 960
    const height = 500
    const [mousePosition, setMousePosition] = useState({x: width / 2, y: height / 2})

    const handleMouseMove = (event: MouseEvent) => {
        const {clientX, clientY} = event
        setMousePosition({
            x: clientX,
            y: clientY
        })
    }


    // вот так можно распарсить cvs файл с помощью d3 в json (а в gist можно хранить какие нибудь данные)
    fetch("https://gist.githubusercontent.com/fogelo/f0f1f772c4e00080ba795f487106d555/raw/d8c6ca3b70bf94cd911ea0fa03670b3e970fe7f9/data")
        .then(text=>{
            return text.text()
        }).then(text=>{
        const data = d3.csvParse(text)
        console.log(data)
    })


    return (
        <svg className={"free-code-camp-svg"}
             width={width}
             height={height}
             onMouseMove={handleMouseMove}
        >
            <circle cx={mousePosition.x}
                    cy={mousePosition.y}
                    r={10}
            />
        </svg>

    );
};

export default MouseMove;