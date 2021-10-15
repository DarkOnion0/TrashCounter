// React
import React from "react"
import { useEffect } from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
// css
import "./css/index.css"

// pages
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import Settings from "./pages/Settings"
import Stats from "./pages/Stats"

// components
import Nav from "./components/Nav"

import { version } from "../package.json"

function Index(props) {
  useEffect(() => {
    // screenWarning()
    checkVersion()
    console.log("Index is mounted")
  }, [])

  // function screenWarning(props) {
  //   console.log(
  //     "Width:",
  //     window.screen.availWidth,
  //     "Height:",
  //     window.screen.availHeight
  //   )
  //   if (window.screen.availHeight > window.screen.availWidth) {
  //     alert(
  //       "You are opening this webapp on a phone or a small screen, please open it on a computer or a large screen"
  //     )
  //   }
  // }

  function checkVersion(props) {
    const ver = localStorage.getItem("version")

    if (ver) {
      console.log("not yet coded")
    } else {
      console.log(`Set version: ${version}`)
      localStorage.setItem("version", JSON.stringify(version))
    }
  }

  return (
    <React.StrictMode>
      <Router basename={"TrashCounter"}>
        {/* The navigation bar */}
        <Nav />

        <div id="invisibleZone"></div>

        <Switch>
          {/* The project links */}
          <Route path="/" exact component={Home} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />

          {/* The 404 error page */}
          <Route path="/">
            <ErrorPage errorCode="404" />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
