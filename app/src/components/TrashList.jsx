import React, { useState, useEffect } from "react"

import Popup from "./Popup"

import "./../css/Main.css"
import "./../css/TrashList.css"

function TrashList(props) {
  // this state is just here for re-rendering the component when a new trash is added
  const [update, setUpdate] = useState(true)

  // STATE
  const [id, setId] = useState("popupContainer")
  const [title, setTitle] = useState(null)
  // const [action, setAction] = useState("none")
  const [content, setContent] = useState(<p>Anythings has been set</p>)
  const [trashName, setTrashName] = useState("none")
  const [trashColor, setTrashColor] = useState("none")
  const [trashTextColor, setTrashTextColor] = useState("none")

  // this useEffect re-render the content of the popup when the color, the name or the text color is changed
  useEffect(() => {
    const action = sessionStorage.getItem("action")
    console.log(action)
    if (action === "add") {
      setContent(contentAdd)
      console.log("adding content")
    } else if (action === "update") {
      console.log("updating content")
      setContent(contentUpdate)
    }
  }, [trashName, trashColor, trashTextColor, title])

  const p1 = (
    <p className="labelText">
      This params will defined the name of your trash. You can choose any name
      you want but <strong>#</strong> is prohibited (the app will crash if you
      do that). This name will also being used as the event name in the
      calendar.
    </p>
  )

  const p2 = (
    <p className="labelText">
      This params will defined the event background color. It can be any css
      color format like rgb code, hex, hsl... picked using the color picker
      above. For more details you can check the{" "}
      <a href="https://developer.mozilla.org">Mozilla Documentation</a>
      ). You can also leave it blank if you just want the blue default color.
    </p>
  )

  const p3 = (
    <p className="labelText">
      This params will defined the event text color. It can be any css color
      format like rgb code, hex, hsl... picked using the color picker above. For
      more details you can check the{" "}
      <a href="https://developer.mozilla.org">Mozilla Documentation</a>
      ). You can also leave it blank if you just want the white default text
      color. If you have changed the default color you should check if you can
      read the text on the selected background.
    </p>
  )

  const contentUpdate = (
    <form id="contentEdit" onSubmit={handleSubmit} autoComplete="off">
      <div id="trashName" className="flex-col">
        <label id="content-1" required>
          <strong>Trash name</strong>
          <input
            id="trashNameAdd"
            type="text"
            className="formTextField"
            // defaultValue={trashName}
            value={trashName}
            onChange={(event) => {
              setTrashName(() => event.target.value)
            }}
          />
          {p1}
        </label>

        <label id="content-2" required>
          <strong>Trash Color (background)</strong>

          <input
            id="trashColorAdd"
            type="color"
            // defaultValue={trashColor}
            value={trashColor}
            onChange={(event) => {
              setTrashColor(() => event.target.value)
            }}
            className="formTextField"
          />
          {p2}
        </label>

        <label id="content-3" required>
          <strong>Trash Color (text)</strong>
          <input
            id="trashTextColorAdd"
            type="color"
            // defaultValue={trashTextColor}
            value={trashTextColor}
            onChange={(event) => {
              setTrashTextColor(() => {
                console.log(event.target.value)

                return event.target.value
              })
            }}
            className="formTextField"
          />
          {p3}
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

  const contentAdd = (
    <form id="contentEdit" onSubmit={handleSubmit} autoComplete="off">
      <div id="trashName" className="flex-col">
        <label id="content-1" required>
          <strong>Trash name</strong>
          <input
            id="trashNameAdd"
            type="text"
            className="formTextField"
            // defaultValue={trashName}
            value={trashName}
            onChange={(event) => {
              setTrashName(() => event.target.value)
            }}
          />
          {p1}
        </label>

        <label id="content-2" required>
          <strong>Trash Color (background)</strong>

          <input
            id="trashColorAdd"
            type="color"
            // defaultValue={trashColor}
            value={trashColor}
            onChange={(event) => {
              setTrashColor(() => event.target.value)
            }}
            className="formTextField"
          />
          {p2}
        </label>

        <label id="content-3" required>
          <strong>Trash Color (text)</strong>
          <input
            id="trashTextColorAdd"
            type="color"
            // defaultValue={trashTextColor}
            value={trashTextColor}
            onChange={(event) => {
              setTrashTextColor(() => {
                console.log(event.target.value)

                return event.target.value
              })
            }}
            className="formTextField"
          />
          {p3}
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

  function getList() {
    var trashList = localStorage.getItem("trashList")
    if (trashList) {
      trashList = JSON.parse(trashList)

      if (props.type === "select") {
        const trashListItems = trashList.map((trashList, index) => (
          <option
            value={`${trashList.name.toLowerCase()}#${index.toString()}`}
            key={trashList.name.toString()}
          >
            {trashList.name}
          </option>
        ))

        // console.log(trashListItems, trashList[0].name.toLowerCase())
        sessionStorage.setItem(
          "trashType",
          `${trashList[0].name.toLowerCase()}#0`
        )

        return trashListItems
      } else if (props.type === "settings") {
        const trashListItems = trashList.map((trashList, index) => (
          <li
            value={`${trashList.name.toLowerCase()}#${index.toString()}`}
            key={trashList.name.toString()}
            className="contentContainer"
          >
            <div id="trashListContent" className="flex-row">
              <span>{trashList.name}</span>
              <button
                value={`${trashList.name.toLowerCase()}#${index.toString()}`}
                className="editContentButton"
                onClick={(event) => {
                  sessionStorage.setItem("action", "update")
                  // setAction("update")

                  sessionStorage.setItem("trashType", event.target.value)
                  // setTrashType(`${event.target.value}`)

                  const trashList = JSON.parse(
                    localStorage.getItem("trashList")
                  )
                  const trashType = sessionStorage.getItem("trashType")
                  const trash = trashList[trashType.split("#")[1]]

                  setTrashName(() => trash.name)
                  setTrashTextColor(() => trash.textColor)
                  setTrashColor(() => trash.color)

                  setTitle(() => `Edit trash: ${trash.name}`)

                  console.log(trash.name, trash.color, trash.textColor)

                  setContent(contentUpdate)
                  // setAction("add")

                  document.getElementById(id).style.display = "block"
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))

        return trashListItems
      } else {
        alert(
          "We detect that you haven't set any Trash to follow yet !\nPlease go in the settings an set at least one trash type"
        )
        return null
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
    const action = sessionStorage.getItem("action")

    trashName = trashName || null

    // console.log(action, [trashName, trashColor, trashTextColor])

    if (trashName) {
      if (action === "add") {
        trashList.push({
          name: trashName,
          color: trashColor,
          textColor: trashTextColor,
        })

        localStorage.setItem(
          `calendar${trashName.toUpperCase()}`,
          JSON.stringify([{}])
        )
      } else if (action === "update") {
        const oldValue = sessionStorage.getItem("trashType")
        // const oldValue = trashType

        const oldCalendar = JSON.parse(
          localStorage.getItem(
            `calendar${oldValue.split("#")[0].toUpperCase()}`
          )
        )
        localStorage.removeItem(
          `calendar${oldValue.split("#")[0].toUpperCase()}`
        )

        trashList[oldValue.split("#")[1]] = {
          name: trashName,
          color: trashColor,
          textColor: trashTextColor,
        }

        oldCalendar.forEach((event) => {
          event.title = trashName
        })

        localStorage.setItem(
          `calendar${trashName.toUpperCase()}`,
          JSON.stringify(oldCalendar)
        )
      } else {
        console.error("handleSummit has been called but nothing was done")
      }

      localStorage.setItem("trashList", JSON.stringify(trashList))
      // sessionStorage.clear()
    }

    closePopup(event, true)
  }

  function closePopup(event, submit) {
    const isSubmitted = submit || false

    // console.log(id)

    event.preventDefault()
    document.getElementById("trashNameAdd").value = ""
    document.getElementById("trashColorAdd").value = ""
    document.getElementById("trashTextColorAdd").value = ""
    document.getElementById(id).style.display = "none"

    if (isSubmitted === true) {
      setUpdate((prevCount) => !prevCount)
    }
  }

  if (props.type === "select") {
    return (
      <select required name="TrashList" onChange={handleChangeList}>
        {getList()}
      </select>
    )
  } else if (props.type === "settings") {
    return (
      <div>
        <div id="trashListContainer">
          <div id="trashTable">
            <ul className="trashList">{getList()}</ul>
          </div>

          <div className="buttonContainer">
            <button
              onClick={() => {
                sessionStorage.setItem("action", "add")

                console.log(content)

                setTrashName(() => "")
                setTrashColor(() => "#3788d8")
                setTrashTextColor(() => "#ffffff")

                setTitle(() => "Add a new trash")

                console.log(trashName, trashColor, trashTextColor)

                setContent(contentAdd)

                // setAction("add")
                document.getElementById(id).style.display = "block"
              }}
            >
              Add new trash
            </button>
          </div>
        </div>
        <Popup id={id} content={content} title={title} />
      </div>
    )
  } else {
    return null
  }
}

export default TrashList
