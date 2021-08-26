import React from "react"
import { useState, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

// components
import DateSelector from "../components/DateSelector"
import TrashList from "../components/TrashList"

// style
import "../css/Main.css"
import "../css/InputContainer.css"

/**
 * @param {{disabled: boolean, handleSubmit: function, buttonMessage: string}} props
 */
function InputContainer(props) {
  return (
    <form
      id={props.id}
      className="inputsForm"
      onSubmit={props.handleSubmit}
      autoComplete="on"
      required
    >
      <div className="flex-row input-zone">
        <label className="content-1" required>
          <h2>Trash Selector</h2>
          <TrashList type="select" />
        </label>

        <label className="content-2" required>
          <h2>Time picker</h2>
          <DateSelector />
        </label>
      </div>

      <div className="buttonContainerSi">
        <button disabled={props.disabled} className="buttonIcon" type="submit">
          <FontAwesomeIcon icon={faPlus} />
          <p>{props.buttonMessage}</p>
        </button>
      </div>
    </form>
  )
}

export default InputContainer
