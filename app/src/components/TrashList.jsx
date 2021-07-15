import React from "react"

import Popup from "./Popup"

import "./../css/Main.css"
import "./../css/TrashList.css"

function TrashList(props) {
  function getList() {
    var trashList = localStorage.getItem("trashList")
    if (trashList) {
      trashList = JSON.parse(trashList)

      if (props.type === "select") {
        const trashListItems = trashList.map((trashList, index) => (
          <option
            value={trashList.name.toLowerCase() + "-" + index.toString()}
            key={trashList.name.toString()}
          >
            {trashList.name}
          </option>
        ))

        // console.log(trashListItems, trashList[0].name.toLowerCase())
        sessionStorage.setItem(
          "trashType",
          `${trashList[0].name.toLowerCase()}-0`
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
    } else {
      return null
    }
  }

  function handleChangeList(event) {
    sessionStorage.setItem("trashType", event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    // console.log("Form has been submitted")

    let trashName = document.getElementById("trashNameAdd").value
    let trashColor = document.getElementById("trashColorAdd").value
    let trashTextColor = document.getElementById("trashTextColorAdd").value

    const trashList = JSON.parse(localStorage.getItem("trashList"))

    trashList.push({
      name: trashName,
      color: trashColor,
      textColor: trashTextColor,
    })

    localStorage.setItem("trashList", JSON.stringify(trashList))
    localStorage.setItem(
      `calendar${trashName.toUpperCase()}`,
      JSON.stringify([{}])
    )

    closePopup(event)
  }

  function closePopup(event) {
    event.preventDefault()
    document.getElementById("trashNameAdd").value = " "
    document.getElementById("trashColorAdd").value = " "
    document.getElementById("trashTextColorAdd").value = " "
    document.getElementById("popupContainer").style.display = "none"
  }

  const popupContent = (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div id="trashName" className="flex-col">
        <label id="content-1" required>
          <strong>Trash name</strong>
          <input id="trashNameAdd" type="text" className="formTextField" />
          <p className="labelText">
            This params will defined the name of your trash. You can choose any
            name you want but <strong>"-"</strong> is prohibited (the app will
            crash if you do that). This name will also being used as the event
            name in the calendar.
          </p>
        </label>

        <label id="content-2" required>
          <strong>Trash Color (background)</strong>

          <input id="trashColorAdd" type="text" className="formTextField" />
          <p className="labelText">
            This params will defined the event background color. It can be any
            css color format like rgb code, hex or css color name (you can find
            the color you want on any color picker, for more details you can
            check the{" "}
            <a href="https://developer.mozilla.org">Mozilla Documentation</a>
            ). You can also leave it blank if you just want the blue default
            color.
          </p>
        </label>

        <label id="content-3" required>
          <strong>Trash Color (text)</strong>
          <input id="trashTextColorAdd" type="text" className="formTextField" />
          <p className="labelText">
            This params will defined the event text color. It can be any css
            color format string like rgb code, hex or css color name (you can
            find the color you want on any color picker, for more details you
            can check the{" "}
            <a href="https://developer.mozilla.org">Mozilla Documentation</a>
            ). You can also leave it blank if you just want the white default
            text color. If you have changed the default color you should check
            if can read the text on the selected background.
          </p>
        </label>

        <div id="buttonContainer" className="buttonContainer">
          <input className="button" type="submit" value="Save" />
          <button className="button" onClick={closePopup}>
            Discard
          </button>
        </div>
      </div>
    </form>
  )

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
        <div className="buttonContainer">
          <button
            onClick={() => {
              document.getElementById("popupContainer").style.display = "block"
            }}
          >
            Add new trash
          </button>
        </div>

        <Popup
          id="popupContainer"
          content={popupContent}
          title="Add a new trash"
        />
      </div>
    )
  } else {
    return null
  }
}

export default TrashList
