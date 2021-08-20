import React, { useState, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTimes,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"

import "../css/Banner.css"

function Banner(props) {
  const [id, setId] = useState("null")

  // const [icons, setIcons] = useState("null")

  useEffect(() => {
    updateInfo()
  }, [props])

  function updateInfo() {
    console.log(id, props.type, props.display, props.content)

    if (props.type === "info") {
      setId(() => "bannerInfoContainer")
      // setIcons(() => props.icons || faQuestionCircle)
    } else if (props.type === "warning") {
      setId(() => "bannerWarningContainer")
      // setIcons(() => props.icons || faTimesCircle)
    } else if (props.type === "error") {
      setId(() => "bannerErrorContainer")
      // setIcons(() => props.icons || faTimesCircle)
    }

    if (props.display === true) {
      document.getElementById(id).style.display = "block"
    }
  }

  function closeBanner(event) {
    event.preventDefault()
    document.getElementById(id).style.display = "none"
  }

  return (
    <div id={id} className="bannerContainer">
      <div className="banner flex-row">
        <span className="bannerIcons">
          {/* <FontAwesomeIcon size="lg" icon={icons} /> */}
        </span>

        <div className="bannerContent">{props.content}</div>

        <span className="closeCross" onClick={closeBanner}>
          <FontAwesomeIcon size="lg" icon={faTimes} />
        </span>
      </div>
    </div>
  )
}

export default Banner
