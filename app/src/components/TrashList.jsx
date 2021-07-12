import React from "react"

import "./../css/Main.css"
import "./../css/TrashList.css"

function TrashList(props) {
  function getList() {
    var trashList = localStorage.getItem("trashlist")
    if (trashList) {
      trashList = JSON.parse(trashList)

      if (props.type === "select") {
        const trashListItems = trashList.map((trashList) => (
          <option
            value={
              trashList.name.toLowerCase() +
              "-" +
              trashList.color.toLowerCase() +
              "-" +
              trashList.textColor.toLowerCase()
            }
            key={trashList.name.toString()}
          >
            {trashList.name}
          </option>
        ))

        // console.log(trashListItems, trashList[0].name.toLowerCase())
        sessionStorage.setItem(
          "trash-type",
          trashList[0].name.toLowerCase() +
            "-" +
            trashList[0].color.toLowerCase() +
            "-" +
            trashList[0].textColor.toLowerCase()
        )

        return trashListItems
      } else if (props.type === "settings") {
        const trashListItems = trashList.map((trashList) => (
          <li
            value={
              trashList.name.toLowerCase() +
              "-" +
              trashList.color.toLowerCase() +
              "-" +
              trashList.textColor.toLowerCase()
            }
            key={trashList.name.toString()}
          >
            {trashList.name}
          </li>
        ))

        return trashListItems
      } else {
        alert(
          "We detect that you haven't set any Trash to follow yet !\nPlease go in the settings an set at least one trash type"
        )
        return <option></option>
      }
    }
  }

  function handleChangeList(event) {
    sessionStorage.setItem("trash-type", event.target.value)
  }

  if (props.type === "select") {
    return (
      <select required name="TrashList" onChange={handleChangeList}>
        {getList()}
      </select>
    )
  } else if (props.type === "settings") {
    return (
      <div id="trashListContainer">
        <h3>Existing trash</h3>

        <ul className="trashList">{getList()}</ul>
      </div>
    )
  } else {
    return null
  }
}

export default TrashList
