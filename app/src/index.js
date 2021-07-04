// React
import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// css
import "./index.css"

// pages
import Dev from "./pages/Dev"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"

// components
import Nav from "./components/Nav"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* The navigation bar */}
      <Nav />

      <Switch>
        {/* The project links */}
        <Route path="/" exact component={Home} />
        <Route path="/dev" component={Dev} />

        {/* The 404 error page */}
        <Route path="/">
          <ErrorPage errorCode="404" />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
