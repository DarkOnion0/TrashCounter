import React from "react"

import "./../css/Main.css"
// import "./../css/DateSelector.css"

function DateSelector(props) {
  sessionStorage.setItem("trashDate", null)

  function handleChange(event) {
    sessionStorage.setItem("trashDate", event.target.value)
  }

  return <input type="date" onChange={handleChange} />
}

export default DateSelector
