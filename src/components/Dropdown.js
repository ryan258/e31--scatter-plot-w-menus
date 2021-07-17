import React from 'react'

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select //
    name={id}
    id={id}
    onChange={(event) => onSelectedValueChange(event.target.value)}
    defaultValue={selectedValue}
  >
    {/* <option value="">--Please choose an option--</option> */}
    {options.map(({ value, label }) => (
      <option //
        id={value}
        // selected={value === selectedValue}
        value={value}
        key={value}
      >
        {label}
      </option>
    ))}
  </select>
)

export default Dropdown
