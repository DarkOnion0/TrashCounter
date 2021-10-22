import React from "react"
import { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCloud,
  faDownload,
  faTrashAlt,
  faUpload,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"

import "./../css/Settings.css"
import "./../css/Main.css"
import TrashList from "../components/TrashList"
import Popup from "../components/Popup"

const axios = require("axios").default

function Settings(props) {
  useEffect(() => {
    dynamicGithubConnection()
  }, [])

  const [content, setContent] = useState(<p>Anythings has been set</p>)

  function importData() {
    const importData = document.createElement("input")
    importData.setAttribute("type", "file")
    importData.setAttribute("id", "inputDoc")

    document.getElementById("invisibleZone").appendChild(importData)

    importData.click()

    importData.addEventListener("change", () => {
      try {
        document
          .getElementById("inputDoc")
          .files[0].text()
          .then((text) => {
            const textJSON = JSON.parse(text)

            // console.log(textJSON)

            for (const i in textJSON) {
              // console.log(i, textJSON[i])*
              if (i === "calendar") {
                for (const iCalendar in textJSON[i]) {
                  localStorage.setItem(
                    iCalendar,
                    JSON.stringify(textJSON[i][iCalendar])
                  )
                }
              } else {
                localStorage.setItem(i, JSON.stringify(textJSON[i]))
              }
            }
            importData.remove()
          })
      } catch (e) {
        console.log(e)
        importData.remove()
      }
    })
  }

  function exportData() {
    const localData = {}
    const calendar = {}

    localData["trashList"] = JSON.parse(localStorage.getItem("trashList"))
    localData["stats"] = JSON.parse(localStorage.getItem("stats"))

    if (localData["trashList"]) {
      for (let i = 0; i < localData["trashList"].length; i++) {
        calendar[`calendar${localData["trashList"][i].name.toUpperCase()}`] =
          JSON.parse(
            localStorage.getItem(
              `calendar${localData["trashList"][i].name.toUpperCase()}`
            )
          )
      }

      localData["calendar"] = calendar
    }

    const file = new Blob([JSON.stringify(localData, null, 2)], {
      type: "application/json",
    })

    const fileUrl = URL.createObjectURL(file)

    const exportData = document.createElement("a")
    exportData.setAttribute("href", fileUrl)
    exportData.setAttribute("download", "TrashCounterSettings.json")

    document.getElementById("invisibleZone").appendChild(exportData)

    exportData.click()

    exportData.remove()
  }

  function deleteData(event) {
    event.preventDefault()

    console.log("All was deleted")

    Object.keys(localStorage).forEach((element) => {
      localStorage.removeItem(element)
    })

    Object.keys(sessionStorage).forEach((element) => {
      sessionStorage.removeItem(element)
    })

    window.location.reload(true)
  }

  function dynamicGithubConnection() {
    console.log(JSON.parse(localStorage.getItem("sync")))

    if (JSON.parse(localStorage.getItem("sync"))) {
      document.getElementById("syncGithub").innerHTML = "Disconnect from GitHub"
    } else {
      document.getElementById("syncGithub").innerHTML = "Connect to GitHub"
    }
  }

  function syncEvent(event) {
    event.preventDefault()

    if (!JSON.parse(localStorage.getItem("sync"))) {
      document.getElementById("syncPopup").style.display = "block"

      setContent(
        <div id="syncFrame">
          <div id="githubSecretContainer">
            <input
              id="githubSecretInput"
              type="password"
              placeholder="Paste your GitHub GIST secret there"
            />
          </div>

          <div id="buttonContainer" className="buttonContainerMul">
            <button
              className="button buttonIcon"
              onClick={(event) => {
                event.preventDefault()
                var token = document.getElementById("githubSecretInput").value
                document.getElementById("githubSecretInput").value = null

                if (token.length === 0) {
                  alert("Please don't set an empty token !")
                } else {
                  const res = axios
                    .get("https://api.github.com/user", {
                      headers: {
                        Authorization: `token ${token}`,
                      },
                    })
                    .then(function (response) {
                      console.log(response)

                      localStorage.setItem("githubToken", JSON.stringify(token))
                      localStorage.setItem("sync", JSON.stringify(true))
                      dynamicGithubConnection()
                      document.getElementById("syncPopup").style.display =
                        "none"
                    })
                }
              }}
            >
              <FontAwesomeIcon icon={faSave} />
              <p>Save</p>
            </button>
            <button
              className="button buttonIcon"
              onClick={(event) => {
                event.preventDefault()
                document.getElementById("syncPopup").style.display = "none"
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
              <p>Discard</p>
            </button>
          </div>
        </div>
      )
    } else {
      localStorage.setItem("sync", JSON.stringify(false))
      localStorage.removeItem("githubToken")
      dynamicGithubConnection()
    }
  }

  return (
    <div className="pageWrapper">
      <div className="pageScrollContainer">
        <div id="settings" className="page-frame">
          <div id="content-display">
            <div id="trash-container" className="display-container">
              <h2>Trash</h2>
              <TrashList type="settings" />
            </div>

            <div id="data-container" className="display-container">
              <h2>Synchronization</h2>

              <div>
                <div id="data-button-container" className="flex-row">
                  <div>
                    <button className="buttonIcon button" onClick={syncEvent}>
                      <FontAwesomeIcon icon={faCloud} />
                      <p id="syncGithub">Connect to GitHub</p>
                    </button>
                  </div>
                </div>
                <Popup
                  id="syncPopup"
                  title="Connect to GitHub"
                  content={content}
                />
              </div>

              <h2>Data</h2>
              <div id="data-button-container" className="flex-row">
                <div>
                  <button className="buttonIcon button" onClick={importData}>
                    <FontAwesomeIcon icon={faUpload} />
                    <p>Import Data</p>
                  </button>
                  {/* <input type="file" id="input"></input> */}
                </div>

                <div>
                  <button className="buttonIcon button" onClick={exportData}>
                    <FontAwesomeIcon icon={faDownload} />
                    <p>Export Data</p>
                  </button>
                </div>
              </div>
            </div>

            <div id="news-container" className="display-container">
              <div>
                <h2>News</h2>
                <strong>Not working yet 😔</strong>
              </div>

              <div>
                <h2>App information</h2>
                <ul id="appInfo">
                  <li>
                    <strong>App version:</strong>{" "}
                    {localStorage.getItem("version")}
                  </li>
                  <li>
                    <strong>App synchronization:</strong>{" "}
                    {JSON.stringify(localStorage.getItem("sync"))}
                  </li>
                </ul>
              </div>
            </div>

            <div id="dangerZone-container" className="display-container">
              <h2>Danger Zone</h2>
              <div className="flex-row">
                <button className="buttonIcon button" onClick={deleteData}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <p>Delete all local data</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
