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

localStorage.setItem(
  "calendar",
  JSON.stringify([
    { title: "Recyclable", date: "2021-07-08" },
    { title: "Dechet vert", date: "2021-08-08" },
  ])
)

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calendarSource = this.calendarSource.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  calendarRef = React.createRef()

  handleSubmit(event) {
    var calendar = JSON.parse(localStorage.getItem("calendar"))

    // console.log(calendar)

    calendar.push({
      title: sessionStorage.getItem("trash-type"),
      date: sessionStorage.getItem("trash-date"),
    })

    // console.log(calendar)

    localStorage.setItem("calendar", JSON.stringify(calendar))

    var calendarApi = this.calendarRef.current.getApi()

    calendarApi.refetchEvents()

    event.preventDefault()
  }

  calendarSource(info, successCallback, failureCallback) {
    try {
      const calendar = JSON.parse(localStorage.getItem("calendar"))

      // console.log("Events already set:\n", calendar)

      successCallback(calendar)
    } catch (e) {
      // console.log("No events set yet !")
      failureCallback(null)
    }
  }

  render() {
    return (
      <div id="home">
        <div className="grid">
          <div id="calendar-container">
            <FullCalendar
              ref={this.calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekNumbers={true}
              weekNumberFormat={{ week: "numeric" }}
              events={this.calendarSource}
            />
          </div>
          <div id="input-container">
            <h1>Add new event</h1>
            <form onSubmit={this.handleSubmit} autoComplete="on">
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

              <input type="submit" value="Add" />
            </form>
            {/* <button onClick={calendar.refetchEvents()} /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
