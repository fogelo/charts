import React, {MouseEvent, useState} from 'react';

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