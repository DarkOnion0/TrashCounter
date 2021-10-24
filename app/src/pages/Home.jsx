import React from "react"
import FullCalendar from "@fullcalendar/react" // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import data from "../JS/data"

// components
// import Banner from "../components/Banner"
import InputContainer from "../components/InputContainer"

// css
import "./../css/Home.css"
import "./../css/Main.css"

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
      bannerType: "info",
      bannerContent: <p>No Message has been set</p>,
      display: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  calendarRef = React.createRef()

  componentDidMount() {
    this.setCalendar()
  }

  async setCalendar() {
    let calendarApi = this.calendarRef.current.getApi()

    let trashList = localStorage.getItem("trashList")

    this.noTrashSet()

    if (trashList) {
      console.log("trashList EXIST")
      try {
        trashList = JSON.parse(trashList)
        let a = trashList[0].name
        this.setState({ disabled: false })
        this.trashSet()
      } catch (e) {
        this.noTrashSet()

        console.warn(e)
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
                console.warn(e)
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
      this.noTrashSet()
    }
  }

  noTrashSet() {
    document.querySelectorAll("[type='date']").forEach((element) => {
      element.setAttribute("disabled", "true")
    })
    document.querySelectorAll("[name='TrashList']").forEach((element) => {
      element.setAttribute("disabled", "true")
    })

    console.log("trashList DOESNT EXIST")

    this.setState({ disabled: true })
    this.setState({ bannerType: "warning" })
    this.setState({
      bannerContent: (
        <p
          className="clickable"
          onClick={() => {
            document.querySelector("a[href='/settings']").click()
          }}
        >
          Please set at least one trash in the settings
        </p>
      ),
    })
    this.setState({ display: true })
  }

  trashSet() {
    this.setState({ display: false })
    this.setState({ disabled: false })

    document.querySelectorAll("[type='date']").forEach((element) => {
      element.removeAttribute("disabled")
    })
    document.querySelectorAll("[name='TrashList']").forEach((element) => {
      element.removeAttribute("disabled")
    })
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
      console.log("\nstats exist")
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
        console.log("check if trash exist")

        if (stats.year[trashYear][trashType.split("#")[0]]) {
          // This statement check if the event is already set in the event year in the localStorage
          console.log("trash exist")

          stats.year[trashYear][trashType.split("#")[0]][
            parseInt(trashMonth) - 1
          ]++
        } else {
          /**
           * This statement add the new event name (provided by the trashList key in the localStorage)
           * and month in the existing year
           */

          console.log("trash doesn't exist")
          stats.year[trashYear][trashType.split("#")[0]] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ]

          stats.year[trashYear][trashType.split("#")[0]][
            parseInt(trashMonth) - 1
          ] = 1
        }
      } catch (e) {
        /**
         * This block is executed if the year is not set in the stats object,
         * it will init a new year with the default value provided by the event
         * (see the doc for more information on the structure of stats localStorage items)
         */
        console.log("year is not set", "\n", e)
        stats.year[trashYear] = {
          [trashType.split("#")[0]]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }

        stats.year[trashYear][trashType.split("#")[0]][
          parseInt(trashMonth) - 1
        ] = 1
      }

      localStorage.setItem("stats", JSON.stringify(stats))
    } else {
      console.log("\nstats doesn't exist")
      const stats = {
        maxYear: trashYear,
        minYear: trashYear,
        year: {
          [trashYear]: {
            [trashType.split("#")[0]]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        },
      }

      stats.year[trashYear][trashType.split("#")[0]][
        parseInt(trashMonth) - 1
      ] = 1

      localStorage.setItem("stats", JSON.stringify(stats))
    }

    if (JSON.parse(localStorage.getItem("sync"))) {
      data.exportData("github")
    }
  }

  handleDelete(event) {
    event.preventDefault()
    console.log("delete event")

    const [trashYear, trashMonth, trashDay] = document
      .querySelector("[id='delete'] input")
      .value.split("-")

    console.log(trashDay)

    if (trashDay !== "") {
      console.log("delete begin")
      const stats = JSON.parse(localStorage.getItem("stats"))
      const [trash, unused] = document
        .querySelector("[id='delete'] select")
        .value.split("#")

      const calendarName = "calendar" + trash.toUpperCase()
      const calendar = JSON.parse(localStorage.getItem(calendarName))

      let deleted = false

      calendar.forEach((element, index) => {
        if (
          deleted === false &&
          element.date === `${trashYear}-${trashMonth}-${trashDay}`
        ) {
          calendar.splice(index, 1)
          deleted = true
        }
      })

      if (deleted === true) {
        console.log(stats, trashYear, trash, parseInt(trashMonth))
        stats.year[trashYear][trash][parseInt(trashMonth) - 1]--

        localStorage.setItem(calendarName, JSON.stringify(calendar))
        localStorage.setItem("stats", JSON.stringify(stats))

        var calendarApi = this.calendarRef.current.getApi()

        calendarApi.refetchEvents()
      } else {
        alert(
          `No trash set for ${trash} the ${trashYear}-${trashMonth}-${trashDay}`
        )
      }
    }

    if (JSON.parse(localStorage.getItem("sync"))) {
      data.exportData("github")
    }
  }

  render() {
    return (
      <div className="pageWrapper">
        {/* <Banner
          type={this.state.bannerType}
          content={this.state.bannerContent}
          display={this.state.display}
        /> */}
        <div className="pageScrollContainer">
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
                <div className="inputBox">
                  <h1 className="titleUnderline">Add new event</h1>
                  <InputContainer
                    id="add"
                    disabled={this.state.disabled}
                    buttonMessage={"Add a new event"}
                    handleSubmit={this.handleSubmit}
                  />
                </div>

                <div className="inputBox">
                  <h1 className="titleUnderline">Remove event</h1>
                  <InputContainer
                    id="delete"
                    disabled={this.state.disabled}
                    buttonMessage={"Delete an Event"}
                    handleSubmit={this.handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
