import React from "react"
import FullCalendar from "@fullcalendar/react" // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

// components
import DateSelector from "../components/DateSelector"
import TrashList from "../components/TrashList"

// css
import "./../css/Home.css"
import "./../css/Main.css"

// Only for dev testing, it must be remove in production
localStorage.setItem(
  "trashlist",
  JSON.stringify([
    { name: "Recyclable", color: "Yellow" },
    { name: "Dechet vert", color: "Green" },
  ])
)

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "Select a trash" }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert(
      "Your favorite flavor is: " + sessionStorage.getItem("selected-trash")
    )
    event.preventDefault()
  }

  render() {
    return (
      <div id="home">
        <div className="grid">
          <div id="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekNumbers={true}
              weekNumberFormat={{ week: "numeric" }}
              events={localStorage.getItem("calendar")}
            />
          </div>
          <div id="input-container">
            <h1>Add new event</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="flex-row">
                <label id="content-1">
                  <h2>Trash Selector</h2>
                  <TrashList type="select" />
                </label>

                <label id="content-2">
                  <h2>Time picker</h2>
                  <DateSelector />
                </label>
              </div>

              <input type="submit" value="Create !" />
            </form>
            {/* <button onClick={calendar.refetchEvents()} /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
