import React from "react"

import "./../css/Settings.css"
import "./../css/Main.css"
import TrashList from "../components/TrashList"

function Settings(props) {
  function importData() {
    const importData = document.createElement("input")
    importData.setAttribute("type", "file")
    importData.setAttribute("id", "inputDoc")

    document.getElementById("downloadZone").appendChild(importData)

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

    let trashList = localStorage.getItem("trashList")
    localData["trashList"] = JSON.parse(trashList)

    // localData.push(JSON.parse(trashList))
    // localData.push(JSON.parse(calendar))

    for (let i = 0; i < localData["trashList"].length; i++) {
      calendar[`calendar${localData["trashList"][i].name.toUpperCase()}`] =
        JSON.parse(
          localStorage.getItem(
            `calendar${localData["trashList"][i].name.toUpperCase()}`
          )
        )
    }

    localData["calendar"] = calendar

    const file = new Blob([JSON.stringify(localData)], {
      type: "application/json",
    })

    const fileUrl = URL.createObjectURL(file)

    const exportData = document.createElement("a")
    exportData.setAttribute("href", fileUrl)
    exportData.setAttribute("download", "TrashCounterSettings.json")

    document.getElementById("downloadZone").appendChild(exportData)

    exportData.click()

    exportData.remove()
  }

  return (
    <div id="settings" className="page-frame">
      {/* {exportData()} */}
      <div id="content-display">
        <div id="data-container" className="display-container">
          <h2>Data</h2>

          <div id="data-button-container" className="flex-row">
            <div>
              <button onClick={importData}>Import Data</button>
              {/* <input type="file" id="input"></input> */}
            </div>

            <div>
              <button onClick={exportData}>Export Data</button>
            </div>
          </div>
        </div>

        <div id="trash-container" className="display-container">
          <h2>Trash</h2>
          <TrashList type="settings" />
        </div>

        <div id="dangerZone-container" className="display-container">
          <h2>Danger Zone</h2>
        </div>

        <div id="news-container" className="display-container">
          <h2>News</h2>
          <strong>
            <p>Not working Yet</p>
          </strong>
        </div>
      </div>
    </div>
  )
}

export default Settings
