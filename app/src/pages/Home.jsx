import React from "react"

// css
import "./../css/Home.css"

function init() {
  try {
    localStorage.getItem("init")
  } catch (e) {
    localStorage.setItem("init", true)
    localStorage.setItem("time", `${Math.floor(Math.random() * 10)}`)
    console.log("Never been loaded")
  }
}

init()
class Home extends React.Component {
  time() {
    console.log(localStorage.getItem("time"))
    return localStorage.getItem("time")
  }

  render() {
    return (
      <div id="home">
        <p>HelloWorld</p>
        <p>{this.time()}</p>
      </div>
    )
  }
}

export default Home
