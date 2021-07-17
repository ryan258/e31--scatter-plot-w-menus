import React from 'react'

const ColorLegend = ({ colorScale, tickSpacing = 20, tickSize = 10, tickTextOffset = 20, onHover, hoveredValue, fadeOpacity }) =>
  colorScale.domain().map((domainValue, i) => (
    <g //
      onMouseEnter={() => {
        onHover(domainValue)
      }}
      onMouseOut={() => {
        onHover(null)
      }}
      className="tick"
      transform={`translate(0, ${i * tickSpacing})`}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ))

export default ColorLegend
