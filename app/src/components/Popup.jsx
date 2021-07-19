import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import "./../css/Popup.css"
import "./../css/Main.css"

function Popup(props) {
  function closePopup(event) {
    event.preventDefault()
    document.getElementById("popupContainer").style.display = "none"
  }

  function renderContent() {
    if (typeof props.content === "function") {
      return props.content()
    } else if (typeof props.content === "object") {
      return props.content
    } else {
      console.error(
        "PLEASE provide an object or a function for the popup content"
      )
      return null
    }
  }

  return (
    <div id={props.id} className="popupContainer">
      <div className="bgPopup"></div>

      <div className="popupDialog">
        <div className="modalDialog">
          <div className="popup grid-pancake">
            <div className="popupHeader flex-row">
              <div className="popupTitle">
                <h1>{props.title}</h1>
              </div>

              <span className="closeCross" onClick={closePopup}>
                <FontAwesomeIcon size="lg" icon={faTimes} />
              </span>
            </div>
            <div className="popupContent">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
