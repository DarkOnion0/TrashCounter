import React from "react"
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartArea, faCog, faHome } from "@fortawesome/free-solid-svg-icons"

import "./../css/Nav.css"
import "./../css/Main.css"

class Nav extends React.Component {
  render() {
    return (
      <div id="NavBar">
        <div id="NavBarContent" className="flex-col">
          <div id="home" className="flex-row">
            <NavLink
              to="/"
              className="link-normal"
              exact
              activeClassName="link-active"
              onClick={window.scroll(0, 0)}
            >
              <div className="navButtonContent">
                <FontAwesomeIcon size="lg" icon={faHome} />
                <p>Home</p>
              </div>
            </NavLink>
          </div>

          <div id="stats" className="flex-row">
            <NavLink
              to="/stats"
              className="link-normal"
              exact
              activeClassName="link-active"
              onClick={window.scroll(0, 0)}
            >
              <div className="navButtonContent">
                <FontAwesomeIcon size="lg" icon={faChartArea} />
                <p>Stats</p>
              </div>
            </NavLink>
          </div>

          <div className="spacerH"></div>

          <div id="settings" className="flex-row">
            <NavLink
              to="/settings"
              className="link-normal"
              exact
              activeClassName="link-active"
              onClick={window.scroll(0, 0)}
            >
              <div className="navButtonContent">
                <FontAwesomeIcon size="lg" icon={faCog} />
                <p>Settings</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav
