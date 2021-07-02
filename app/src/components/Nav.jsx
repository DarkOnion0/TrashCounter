import React from "react"
import { Link } from "react-router-dom"

import "./../css/Nav.css"
import "./../css/Main.css"

class Nav extends React.Component {
  render() {
    return (
      <ul className="flex">
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/Dev">
          <li>Dev</li>
        </Link>
      </ul>
    )
  }
}

export default Nav
