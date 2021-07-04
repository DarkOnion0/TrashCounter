import React from "react"
import logo404 from "./../images/404/undraw_lost_1.svg"
import { useHistory } from "react-router-dom"
import "./../css/ErrorPage.css"

class ErrorPage extends React.Component {
  constructor(props) {
    super(props)

    this.whichError = this.whichError.bind(this)
  }

  whichError() {
    if (this.props.errorCode === "404") {
      return (
        <div id="error-404" className="flex-col">
          <img src={logo404} alt="A lost person with a tree" />
          <strong onClick={() => useHistory().push("/")}>
            ERROR 404: Page not found
          </strong>
        </div>
      )
    }
  }

  render() {
    return <div>{this.whichError()}</div>
  }
}

export default ErrorPage
