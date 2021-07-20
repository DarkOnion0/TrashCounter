import React from "react"
import FullCalendar from "@fullcalendar/react" // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

// components
import DateSelector from "../components/DateSelector"
import TrashList from "../components/TrashList"

// css
import "./../css/Home.css"
import "./../css/Main.css"

// Only for dev testing, it must be remove in production
// localStorage.setItem(
//   "trashList",
//   JSON.stringify([
//     { name: "Recyclable", color: "#fbff00", textColor: "#000000" },
//     { name: "Dechet vert", color: "#59ff00", textColor: "#ffffff" },
//   ])
// )

// localStorage.setItem(
//   "calendarRECYCLABLE",
//   JSON.stringify([
//     {
//       title: "Recyclable",
//       date: "2021-07-08",
//     },
//   ])
// )
// localStorage.setItem(
//   "calendarDECHET VERT",
//   JSON.stringify([
//     {
//       title: "Dechet vert",
//       date: "2021-08-08",
//       color: "Green",
//       textColor: "white",
//     },
//   ])
// )

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  calendarRef = React.createRef()

  componentDidMount() {
    let calendarApi = this.calendarRef.current.getApi()

    let trashList = localStorage.getItem("trashList")

    if (trashList) {
      let trashListExist

      try {
        trashList = JSON.parse(trashList)
        trashList[0].name
        this.setState({ disabled: false })
      } catch (e) {
        this.setState({ disabled: true })

        console.error(e)
      }

      if (this.state.disabled === false) {
        for (let i = 0; i < trashList.length; i++) {
          calendarApi.addEventSource({
            events: (info, successCallback, failureCallback) => {
              try {
                const calendar = JSON.parse(
                  localStorage.getItem(
                    `calendar${trashList[i].name.toUpperCase()}`
                  )
                )

                // console.log(calendar)

                successCallback(calendar)
              } catch (e) {
                console.error(e)
                failureCallback([{}])
              }
            },
            color: trashList[i].color,
            textColor: trashList[i].textColor,
            id: `calendar${trashList[i].name.toUpperCase()}`,
          })
        }
        calendarApi.refetchEvents()
      }
    } else {
      this.setState({ disabled: true })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const trashList = JSON.parse(localStorage.getItem("trashList"))
    const trashType = sessionStorage.getItem("trashType")
    const index = trashType.split("#")[1]
    // console.log(index)
    const calendarName = "calendar" + trashList[index].name.toUpperCase()

    // console.log(calendar)

    const calendar = JSON.parse(localStorage.getItem(calendarName))

    calendar.push({
      title: trashType.split("#")[0],
      date: sessionStorage.getItem("trashDate"),
      // color: trashList[index].color,
      // textColor: trashList[index].textColor,
    })

    localStorage.setItem(calendarName, JSON.stringify(calendar))

    var calendarApi = this.calendarRef.current.getApi()

    calendarApi.refetchEvents()
  }

  render() {
    return (
      <div id="home" className="page-frame">
        <div className="grid">
          <div id="calendar-container" className="display-container">
            <FullCalendar
              ref={this.calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekNumbers={true}
              weekNumberFormat={{ week: "numeric" }}
            />
          </div>
          <div id="input-container" className="display-container">
            <h1>Add new event</h1>
            <form onSubmit={this.handleSubmit} autoComplete="on" required>
              <div id="input-zone" className="flex-row">
                <label id="content-1">
                  <h2>Trash Selector</h2>
                  <TrashList type="select" />
                </label>

                <label id="content-2" required>
                  <h2>Time picker</h2>
                  <DateSelector />
                </label>
              </div>

              <div className="buttonContainerSi">
                <button
                  disabled={this.state.disabled}
                  className="buttonIcon"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>Add A New Trash</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
