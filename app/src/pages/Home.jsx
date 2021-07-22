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
      try {
        trashList = JSON.parse(trashList)
        let a = trashList[0].name
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
    const monthTable = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    }

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

    var stats = localStorage.getItem("stats")

    const [trashYear, trashMonth, trashDay] = sessionStorage
      .getItem("trashDate")
      .split("-")
    var statsExist

    try {
      stats = JSON.parse(stats)
      let a = stats.minYear
      statsExist = true
    } catch (e) {
      statsExist = false
    }

    if (statsExist === true) {
      console.log("stats exist")
      if (stats.minYear > trashYear) {
        /**
         * This statement check if the minYear set in the localStorage is superior or not to the event year,
         * if it's superior the minYear value will be set to the event year
         */

        stats.minYear = trashYear
        console.log("minYear is not the minus")
      }
      if (stats.maxYear < trashYear) {
        /**
         * This statement check if the maxYear set in the localStorage is inferior or not to event year,
         * if it's inferior the maxYear value will be set to the event year
         */

        stats.maxYear = trashYear
        console.log("maxYear is not the biggest one")
      }

      try {
        // This block is executed until the end if the event year already exists in the localStorage
        console.log("check if month exist")

        let monthExist = false
        for (let i = 0; i < stats.year[trashYear].length; i++) {
          console.log(i, stats.year[trashYear])

          if (stats.year[trashYear][i].month === monthTable[trashMonth]) {
            // This statement check if the event month is already set in the event year in the localStorage
            console.log("month exist")
            monthExist = true

            if (stats.year[trashYear][i][trashType.split("#")[0]]) {
              /**
               * This statement check if the event name is set in the localStorage,
               * and will just update the count of this trash during the month
               */

              console.log("trash already exist")
              stats.year[trashYear][i][trashType.split("#")[0]] =
                stats.year[trashYear][i][trashType.split("#")[0]] + 1
            } else {
              /**
               * This statement add the new event name and its color (provided by the trashList key in the localStorage)
               * in the existing month
               */

              console.log("trash doesn't exist")
              stats.year[trashYear][i][trashType.split("#")[0]] = 1
              stats.year[trashYear][i][trashType.split("#")[0] + "Color"] =
                trashList[index].color
              console.log(stats.year[trashYear][i][trashType.split("#")[0]])
            }
          }
        }

        if (monthExist === false) {
          /**
           * This statement add the new event name, color (provided by the trashList key in the localStorage)
           * and month in the existing year
           */

          console.log("month doesn't exist")
          stats.year[trashYear].push({
            month: monthTable[trashMonth],
            [trashType.split("#")[0]]: 1,
            [trashType.split("#")[0] + "Color"]: trashList[index].color,
          })
        }
      } catch (e) {
        /**
         * This block is executed if the year is not set in the stats object,
         * it will init a new year with the default value provided by the event
         * (see the doc for more information on the structure of stats localStorage items)
         */
        stats.year[trashYear] = [
          {
            month: monthTable[trashMonth],
            [trashType.split("#")[0]]: 1,
            [trashType.split("#")[0] + "Color"]: trashList[index].color,
          },
        ]
      }

      localStorage.setItem("stats", JSON.stringify(stats))
    } else {
      console.log("stats doesn't exist")
      const stats = {
        maxYear: trashYear,
        minYear: trashYear,
        year: {
          [trashYear]: [
            {
              month: monthTable[trashMonth],
              [trashType.split("#")[0]]: 1,
              [trashType.split("#")[0] + "Color"]: trashList[index].color,
            },
          ],
        },
      }

      localStorage.setItem("stats", JSON.stringify(stats))
    }
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
