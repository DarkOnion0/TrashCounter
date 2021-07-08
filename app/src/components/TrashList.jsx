import React from "react"

import "./../css/Main.css"
import "./../css/TrashList.css"

function TrashList(props) {
  function getList() {
    var trashList = localStorage.getItem("trashlist")
    if (trashList) {
      trashList = JSON.parse(trashList)

      const trashListItems = trashList.map((trashList) => (
        <option
          value={trashList.name.toLowerCase()}
          key={trashList.name.toString()}
        >
          {trashList.name}
        </option>
      ))

      // console.log(trashListItems, trashList[0].name.toLowerCase())
      sessionStorage.setItem("trash-type", trashList[0].name.toLowerCase())

      return trashListItems
    } else {
      alert(
        "We detect that you haven't set any Trash to follow yet !\nPlease go in the settings an set at least one trash type"
      )
      return <option></option>
    }
  }

  function handleChange(event) {
    sessionStorage.setItem("trash-type", event.target.value)
  }

  if (props.type === "select") {
    return (
      <select required name="TrashList" onChange={handleChange}>
        {getList()}
      </select>
    )
  } else {
    return null
  }
}

export default TrashList
