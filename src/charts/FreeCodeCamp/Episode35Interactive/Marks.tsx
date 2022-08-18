import React from "react";

export const Marks = ({
                          data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius,
                          colorValue, colorScale
                      }: any) => {
    return (
        data.map((d: any) => {
            return (
                <circle cx={xScale(xValue(d))}
                        cy={yScale(yValue(d))}
                        r={circleRadius}
                        fill={colorScale(colorValue(d))}
                >
                    <title>{tooltipFormat(d.Population)}</title>
                </circle>
            )
        })
    )
}