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
        >
          Home
        </NavLink>

        <NavLink
          to="/dev"
          className="link-normal"
          exact
          activeClassName="link-active"
        >
          Dev
        </NavLink>

        <spacer></spacer>

        <NavLink
          to="/settings"
          className="link-normal"
          exact
          activeClassName="link-active"
        >
          Settings
        </NavLink>
      </div>
    )
  }
}

export default Nav
