import React from "react"
import { useEffect, useState } from "react"
import data from "../JS/data"

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
                    .get("https://api.github.com/gists", {
                      headers: {
                        Authorization: `token ${token}`,
                      },
                    })
                    .then(function (response) {
                      console.log(response)

                      localStorage.setItem("githubToken", JSON.stringify(token))
                      localStorage.setItem("sync", JSON.stringify(true))
                      dynamicGithubConnection()

                      response.data.forEach((element) => {
                        if (element.files["TrashCounterInformation.json"]) {
                          console.log("Gists already exist")
                          localStorage.setItem(
                            "gistId",
                            JSON.stringify(element.id)
                          )
                          data.importData("github")
                        }
                      })

                      if (!localStorage.getItem("gistId")) {
                        console.log("Gists don't exist")
                        const gistRequest = axios
                          .post(
                            "https://api.github.com/gists",
                            {
                              files: {
                                "TrashCounterInformation.json": {
                                  content: JSON.stringify({
                                    dataStructureVersion: "1.0.0",
                                  }),
                                },
                                "localStorage.json": {
                                  content: JSON.stringify({
                                    dontUseMe: true,
                                  }),
                                },
                              },
                            },
                            {
                              headers: {
                                Accept: "application/vnd.github.v3+json",
                                Authorization: `token ${token}`,
                              },
                            }
                          )
                          .then((gistRequestResponse) => {
                            console.log(gistRequestResponse)
                            localStorage.setItem(
                              "gistId",
                              JSON.stringify(gistRequestResponse.data.id)
                            )
                            data.exportData("github")
                          })
                      }
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
      localStorage.removeItem("gistId")
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
                  <button
                    className="buttonIcon button"
                    onClick={() => data.importData("local")}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    <p>Import Data</p>
                  </button>
                  {/* <input type="file" id="input"></input> */}
                </div>

                <div>
                  <button
                    className="buttonIcon button"
                    onClick={() => data.exportData("local")}
                  >
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
