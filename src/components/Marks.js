import React from 'react'

const Marks = ({ data, xScale, yScale, xValue, yValue, colorScale, colorValue, tooltipFormat, circleRadius }) =>
  data.map((d) => (
    <circle //
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
      className="mark"
    >
      {/* make a simple tooltip */}
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ))

export default Marks
