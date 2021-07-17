import React from 'react'
import { scaleLinear, extent, format } from 'd3'
import AxisBottom from './components/AxisBottom'
import AxisLeft from './components/AxisLeft'
import Marks from './components/Marks'
import { useData } from './hooks/useData'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run

const width = 960
const height = 500
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 90
}
const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  // console.log(data[0])

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const xValue = (d) => d.petal_length
  const xAxisLabel = 'Petal Length'

  const yValue = (d) => d.sepal_width
  const yAxisLabel = 'Sepal Width'

  const xScale = scaleLinear() //
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear() //
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B')

  // Fortunately scales can tell us their ticks
  // console.log(xScale.ticks())

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* use the tick generation logic */}
        <AxisBottom //
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text //
          textAnchor="middle"
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset},
          ${innerHeight / 2}) rotate(-90) `}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text //
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <Marks //
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg>
  )
}

export default App
