import React from "react"

import "./../css/Settings.css"
import "./../css/Main.css"
import TrashList from "../components/TrashList"

function Settings(props) {
  function importData() {}

  function exportData() {
    const localData = []

    let trashList = localStorage.getItem("trashlist")
    let calendar = localStorage.getItem("calendar")

    localData.push(JSON.parse(trashList))
    localData.push(JSON.parse(calendar))

    const file = new Blob([JSON.stringify(localData)], {
      type: "application/json",
    })

    const fileUrl = URL.createObjectURL(file)

    const exportData = document.createElement("a")
    exportData.setAttribute("href", fileUrl)
    exportData.setAttribute("download", "TrashCounterSettings.json")

    document.getElementById("downloadZone").appendChild(exportData)

    exportData.click()

    // window.open(fileUrl)
  }

  return (
    <div id="settings" className="page-frame">
      {/* {exportData()} */}
      <div id="content-display">
        <div id="data-container" className="display-container">
          <h2>Data</h2>

          <div id="data-button-container" className="flex-row">
            <div>
              <button onClick={importData}>
                <a id="importData">Import Data (Not Working Yet)</a>
              </button>
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
