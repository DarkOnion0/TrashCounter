import React from "react"

import "./../css/Main.css"
import "./../css/DateSelector.css"

function DateSelector(props) {
  sessionStorage.setItem("trash-date", null)

  function handleChange(event) {
    sessionStorage.setItem("trash-date", event.target.value)
  }

  return <input type="date" onChange={handleChange} />
}

export default DateSelector
