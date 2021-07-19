import React from "react"
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartArea, faCog, faHome } from "@fortawesome/free-solid-svg-icons"

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
          <FontAwesomeIcon icon={faHome} />
        </NavLink>

        <NavLink
          to="/stats"
          className="link-normal"
          exact
          activeClassName="link-active"
          onClick={window.scroll(0, 0)}
        >
          <FontAwesomeIcon icon={faChartArea} />
        </NavLink>

        <p></p>

        <NavLink
          to="/settings"
          className="link-normal"
          exact
          activeClassName="link-active"
          onClick={window.scroll(0, 0)}
        >
          <FontAwesomeIcon icon={faCog} />
        </NavLink>
      </div>
    )
  }
}

export default Nav
