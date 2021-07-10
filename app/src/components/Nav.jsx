import React from "react"
import { NavLink } from "react-router-dom"

import "./../css/Nav.css"
import "./../css/Main.css"

class Nav extends React.Component {
  render() {
    return (
      <div id="NavBar" className="grid-pancake">
        <NavLink
          to="/"
          className="link-normal"
          exact
          activeClassName="link-active"
          onClick={window.scroll(0, 0)}
        >
          Home
        </NavLink>

        <NavLink
          to="/stats"
          className="link-normal"
          exact
          activeClassName="link-active"
          onClick={window.scroll(0, 0)}
        >
          Stats
        </NavLink>

        <p></p>

        <NavLink
          to="/settings"
          className="link-normal"
          exact
          activeClassName="link-active"
          onClick={window.scroll(0, 0)}
        >
          Settings
        </NavLink>
      </div>
    )
  }
}

export default Nav
