import React from "react"

import "./../css/Settings.css"
import "./../css/Main.css"

function Settings(props) {
  return (
    <div id="settings" className="page-frame">
      <div id="content-display">
        <div id="data-container" className="display-container">
          <h2>Data</h2>
        </div>
        <div id="trash-container" className="display-container">
          <h2>Trash</h2>
        </div>
        <div id="dangerZone-container" className="display-container">
          <h2>Danger Zone</h2>
        </div>
        <div id="news-container" className="display-container">
          <h2>News</h2>
        </div>
      </div>
    </div>
  )
}

export default Settings
