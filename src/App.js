import React, { useState } from 'react'
import { scaleLinear, scaleOrdinal, extent, format } from 'd3'
import ReactDropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import AxisBottom from './components/AxisBottom'
import AxisLeft from './components/AxisLeft'
import Marks from './components/Marks'
import { useData } from './hooks/useData'
import Dropdown from './components/Dropdown'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run

const width = 960
const menuHeight = 82
const height = 500 - menuHeight
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 90
}
const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' }
]

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label
    }
  }
}

const App = () => {
  const data = useData()

  const initialXAttribute = 'petal_length'
  const [xAttribute, setXAttribute] = useState(initialXAttribute)
  // console.log(xAttribute)
  const xValue = (d) => d[xAttribute]
  const xAxisLabel = getLabel(xAttribute)

  const initialYAttribute = 'sepal_width'
  const [yAttribute, setYAttribute] = useState(initialYAttribute)
  // console.log(yAttribute)
  const yValue = (d) => d[yAttribute]
  const yAxisLabel = getLabel(yAttribute)

  const colorValue = (d) => d.species

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  // console.log(data.columns)
  // console.log(data[0])

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const xScale = scaleLinear() //
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear() //
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B')

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue)) // the 3 species
    // console.log(colorScale.domain()) // renders out the 3 species
    .range(['#E6842A', '#137B80', '#8E6C8A']) // the range of colors
  // console.log(colorScale.range()) // we get an array of our 3 colors

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown // X Axis
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown // X Axis
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
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
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={5}
          />
        </g>
      </svg>
    </>
  )
}

export default App
