import React from "react"
import FullCalendar from "@fullcalendar/react" // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

// components
import DateSelector from "../components/DateSelector"
import TrashList from "../components/TrashList"
import Banner from "../components/Banner"

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
  }

  calendarRef = React.createRef()

  componentDidMount() {
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
    document.querySelector("[type='date']").setAttribute("disabled", "true")
    document
      .querySelector("[name='TrashList']")
      .setAttribute("disabled", "true")

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

    document.querySelector("[type='date']").removeAttribute("disabled")
    document.querySelector("[name='TrashList']").removeAttribute("disabled")
  }

  handleSubmit(event) {
    event.preventDefault()
    const trashList = JSON.parse(localStorage.getItem("trashList"))
    const trashType = sessionStorage.getItem("trashType")
    const index = trashType.split("#")[1]
    // console.log(index)
    const calendarName = "calendar" + trashList[index].name.toUpperCase()
    const monthTable = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
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

        let trashExist = false

        if (stats.year[trashYear][trashType.split("#")[0]]) {
          // This statement check if the event is already set in the event year in the localStorage
          console.log("trash exist")
          trashExist = true
          let monthExist = false

          console.log(stats.year[trashYear][trashType.split("#")[0]].length)
          console.log(trashYear, trashType.split("#")[0])

          for (
            let i = 0;
            i < stats.year[trashYear][trashType.split("#")[0]].length;
            i++
          ) {
            console.log("checking if month exist...")
            console.log(
              `stats month: ${
                stats.year[trashYear][trashType.split("#")[0]][i].x
              }, monthTable: ${monthTable[trashMonth]}`
            )

            if (
              stats.year[trashYear][trashType.split("#")[0]][i].x ===
              monthTable[trashMonth]
            ) {
              monthExist = true

              console.log("trash month is set")

              stats.year[trashYear][trashType.split("#")[0]][i].trash =
                stats.year[trashYear][trashType.split("#")[0]][i].trash + 1
            }
          }

          if (!monthExist) {
            console.log("trash month is not set")
            stats.year[trashYear][trashType.split("#")[0]].push({
              x: monthTable[trashMonth],
              trash: 1,
            })
          }
        } else {
          /**
           * This statement add the new event name, color (provided by the trashList key in the localStorage)
           * and month in the existing year
           */

          console.log("trash doesn't exist")
          stats.year[trashYear][trashType.split("#")[0]] = {
            x: monthTable[trashMonth],
            trash: {
              [trashType.split("#")[0]]: 1,
            },
          }
        }
      } catch (e) {
        /**
         * This block is executed if the year is not set in the stats object,
         * it will init a new year with the default value provided by the event
         * (see the doc for more information on the structure of stats localStorage items)
         */
        console.log("year is not set", "\n", e)
        stats.year[trashYear] = {
          [trashType.split("#")[0]]: [
            {
              x: monthTable[trashMonth],
              trash: 1,
            },
          ],
        }
      }

      localStorage.setItem("stats", JSON.stringify(stats))
    } else {
      console.log("\nstats doesn't exist")
      const stats = {
        maxYear: trashYear,
        minYear: trashYear,
        year: {
          [trashYear]: {
            [trashType.split("#")[0]]: [
              {
                x: monthTable[trashMonth],
                trash: 1,
              },
            ],
          },
        },
      }

      localStorage.setItem("stats", JSON.stringify(stats))
    }
  }

  render() {
    return (
      <div className="pageWrapper">
        <Banner
          type={this.state.bannerType}
          content={this.state.bannerContent}
          display={this.state.display}
        />
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
                      <p>Add a new event</p>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
