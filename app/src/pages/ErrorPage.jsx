import React from "react"
import logo404 from "./../images/404/undraw_lost_1.svg"
import { useHistory } from "react-router-dom"
import "./../css/ErrorPage.css"

function ErrorPage(props) {
  const history = useHistory()

  function goHome() {
    history.push("/")
  }

  function whichError() {
    if (props.errorCode === "404") {
      return (
        <div className="pageWarper">
          <div id="error-404" className="flex-col">
            <img src={logo404} alt="A lost person with a tree" />
            <strong onClick={goHome}>
              No page found for: <code>{window.location.href}</code>
            </strong>
          </div>
        </div>
      )
    }
  }

  return <div>{whichError()}</div>
}

export default ErrorPage
