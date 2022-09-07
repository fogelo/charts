import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3"
import './MySelectionArea.scss'


const MySelectionArea = () => {

    const [rectCoordinates, setRectCoordinates] = useState(null)
    const [size, setSize] = useState(null)
    const [scale, setScale] = useState('scale(1,1)')

    const onMouseDown = (e) => {
        setRectCoordinates({x: e.clientX, y: e.clientY})
    }
    const onMouseMove = (e) => {
        if (rectCoordinates) {
            const size = {
                width: Math.abs(e.clientX - rectCoordinates?.x),
                height: Math.abs(e.clientY - rectCoordinates?.y)
            }
            const scale = e.clientX < rectCoordinates.x && e.clientY > rectCoordinates.y ? 'scale(-1,1)'
                : e.clientX < rectCoordinates.x && e.clientY < rectCoordinates.y ? 'scale(-1,-1)'
                    : e.clientX > rectCoordinates.x && e.clientY < rectCoordinates.y ? 'scale(1,-1)'
                        : 'scale(1,1)'
            setSize(size)
            setScale(scale)
        }
    }

    const onMouseUp = () => {
        setSize(null)
        setRectCoordinates(null)
    }


    useEffect(() => {


    }, [])

    return (
        <svg width={500} height={500}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
        >
            {size &&
                <g transform={`translate(${rectCoordinates?.x}, ${rectCoordinates?.y})`}>
                    <rect height={size?.height} width={size?.width}
                          transform={scale}
                          opacity={0.1}>

                    </rect>
                </g>}

        </svg>
    )
}

export default MySelectionArea;