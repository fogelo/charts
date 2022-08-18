import React from "react";

export const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius}: any) => {
    return (
        data.map((d: any) => {
            return (
                <circle className={"bar"}
                        cx={xScale(xValue(d))}
                        cy={yScale(yValue(d))}
                        r={circleRadius}
                >
                    <title>{tooltipFormat(d.Population)}</title>
                </circle>
            )
        })
    )
}