import React, { useState, useEffect } from "react"
import data from "../JS/data"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEdit,
  faPlus,
  faSave,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"

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
  const [trashPrice, setTrashPrice] = useState(0)
  const [trashIndex, setTrashIndex] = useState("none")

  // this useEffect re-render the content of the popup when the color, the name or the text color is changed
  useEffect(() => {
    const action = sessionStorage.getItem("action")
    // console.log(action)
    if (action === "add") {
      setContent(contentAdd)
      // console.log("adding content")
    } else if (action === "update") {
      // console.log("updating content")
      setContent(contentUpdate)
    }
  }, [trashName, trashColor, trashTextColor, trashPrice, title])

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

  const p4 = <p className="labelText">Defined the price of your trash.</p>

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
                // console.log(event.target.value)

                return event.target.value
              })
            }}
            className="formTextField"
          />
          {p3}
        </label>

        <label id="content-4" required>
          <strong>Trash price (set no currency)</strong>
          <input
            id="trashPrice"
            type="number"
            className="formTextField"
            // defaultValue={trashName}
            value={trashPrice}
            onChange={(event) => {
              setTrashPrice(() => event.target.value)
            }}
          />
          {p4}
        </label>

        <div id="buttonContainerTL" className="buttonContainerMul">
          <div id="buttonContainer1">
            <button className="button buttonIcon" onClick={removeTrash}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <p>Delete Trash</p>
            </button>
          </div>

          <div id="buttonContainer2" className="buttonContainerSi">
            <button className="button buttonIcon" type="submit">
              <FontAwesomeIcon icon={faSave} />
              <p>Save</p>
            </button>
            <button className="button buttonIcon" onClick={closePopup}>
              <FontAwesomeIcon icon={faTimesCircle} />
              <p>Discard</p>
            </button>
          </div>
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
                // console.log(event.target.value)

                return event.target.value
              })
            }}
            className="formTextField"
          />
          {p3}
        </label>

        <label id="content-4" required>
          <strong>Trash price (set no currency)</strong>
          <input
            id="trashPrice"
            type="number"
            className="formTextField"
            // defaultValue={trashName}
            value={trashPrice}
            onChange={(event) => {
              setTrashPrice(() => event.target.value)
            }}
          />
          {p4}
        </label>

        <div id="buttonContainer" className="buttonContainerMul">
          <button className="button buttonIcon" type="submit">
            <FontAwesomeIcon icon={faSave} />
            <p>Save</p>
          </button>
          <button className="button buttonIcon" onClick={closePopup}>
            <FontAwesomeIcon icon={faTimesCircle} />
            <p>Discard</p>
          </button>
        </div>
      </div>
    </form>
  )

  function getList() {
    var trashList = localStorage.getItem("trashList")
    let trashListExist

    try {
      trashList = JSON.parse(trashList)
      let a = trashList[0].name
      trashListExist = true
    } catch (e) {
      trashListExist = false
      console.warn(e)
    }

    if (trashListExist === true) {
      // console.log(trashList)

      if (props.type === "select") {
        const trashListItems = trashList.map((trashList, index) => (
          <option
            value={`${trashList.name}#${index.toString()}`}
            key={trashList.name.toString() + index.toString()}
          >
            {trashList.name}
          </option>
        ))

        // console.log(trashListItems, trashList[0].name)
        sessionStorage.setItem("trashType", `${trashList[0].name}#0`)

        return trashListItems
      } else if (props.type === "settings") {
        const trashListItems = trashList.map((trashList, index) => (
          <li
            value={`${trashList.name}#${index.toString()}`}
            key={trashList.name.toString() + index.toString()}
            className="contentContainer"
          >
            <div id="trashListContent" className="flex-row">
              <strong>{trashList.name}</strong>
              <button
                value={`${trashList.name}#${index.toString()}`}
                className="editContentButton buttonIcon button"
                onClick={(event) => {
                  if (event.target.value) {
                    sessionStorage.setItem("action", "update")
                    // setAction("update")

                    sessionStorage.setItem("trashType", event.target.value)
                    // setTrashType(`${event.target.value}`)

                    const trashList = JSON.parse(
                      localStorage.getItem("trashList")
                    )
                    const trashType = event.target.value
                    const trash = trashList[trashType.split("#")[1]]

                    // console.log(event.target, trash, trashType)

                    setTrashName(() => trash.name)
                    setTrashTextColor(() => trash.textColor)
                    setTrashColor(() => trash.color)
                    setTrashPrice(() => trash.price)

                    setTrashIndex(() => trashType.split("#")[1])

                    setTitle(() => `Edit trash: ${trash.name}`)

                    // console.log(trash.name, trash.color, trash.textColor)

                    setContent(contentUpdate)
                    // setAction("add")

                    document.getElementById(id).style.display = "block"
                  }
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit Trash
              </button>
            </div>
          </li>
        ))

        return trashListItems
      }
    } else {
      if (props.type === "select") {
        return <option>Please select a trash</option>
      }

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

    const trashList = JSON.parse(localStorage.getItem("trashList")) || []
    const action = sessionStorage.getItem("action")

    trashName = trashName || null

    // console.log(action, [trashName, trashColor, trashTextColor])

    if (trashName) {
      if (action === "add") {
        let sameName = false

        for (let i = 0; i < trashList.length; i++) {
          if (trashList[i].name === trashName) {
            sameName = true
          }
        }

        if (sameName === false) {
          trashList.push({
            name: trashName,
            color: trashColor,
            textColor: trashTextColor,
            price: parseInt(trashPrice),
          })

          localStorage.setItem(
            `calendar${trashName.toUpperCase()}`,
            JSON.stringify([{}])
          )

          console.log(trashList)
        } else {
          alert("Please provide a different name than already existing one")
        }
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
          price: parseInt(trashPrice),
        }

        oldCalendar.forEach((event) => {
          event.title = trashName
        })

        localStorage.setItem(
          `calendar${trashName.toUpperCase()}`,
          JSON.stringify(oldCalendar)
        )
      } else {
        console.warn("handleSummit has been called but nothing was done")
      }

      localStorage.setItem("trashList", JSON.stringify(trashList))
      // sessionStorage.clear()
    }

    closePopup(event, true)

    if (JSON.parse(localStorage.getItem("sync"))) {
      data.exportData("github")
    }
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

  function removeTrash(event) {
    event.preventDefault()

    const trashList = JSON.parse(localStorage.getItem("trashList"))
    console.log(trashIndex)
    trashList.splice(trashIndex, 1)

    localStorage.setItem("trashList", JSON.stringify(trashList))
    localStorage.removeItem(`calendar${trashName.toUpperCase()}`)

    setUpdate((prevCount) => !prevCount)

    closePopup(event)
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
          <ul className="trashList">{getList()}</ul>

          <div className="buttonContainerSi">
            <button
              className="buttonIcon button"
              onClick={() => {
                sessionStorage.setItem("action", "add")

                // console.log(content)

                setTrashName(() => "")
                setTrashColor(() => "#3788d8")
                setTrashTextColor(() => "#ffffff")
                setTrashPrice(() => 0)

                setTitle(() => "Add a new trash")

                // console.log(trashName, trashColor, trashTextColor)

                setContent(contentAdd)

                // setAction("add")
                document.getElementById(id).style.display = "block"
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              <p>Add A New Trash</p>
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
