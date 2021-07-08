import React from "react"

import "./../css/Main.css"
import "./../css/DateSelector.css"

function DateSelector(props) {
  function handleChange(event) {
    sessionStorage.setItem("date-trash", event.target.value)
  }

  return <input type="date" onChange={handleChange} />
}

export default DateSelector
