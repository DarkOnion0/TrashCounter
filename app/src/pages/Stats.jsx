import React, { useEffect, useState } from "react"

import { ResponsiveBar } from "@nivo/bar"

import "./../css/Stats.css"
import "./../css/Main.css"

function Stats() {
  const [action, setAction] = useState("none")
  const [dataNivo, setDataNivo] = useState("none")
  const [minYear, setMinYear] = useState("none")
  const [maxYear, setMaxYear] = useState("none")
  const [selectedYear, setSelectedYear] = useState("none")
  const [keys, setKeys] = useState("none")

  useEffect(() => {
    var stats = localStorage.getItem("stats")

    try {
      stats = JSON.parse(stats)
      let a = stats.minYear
      setMinYear(() => stats.minYear + "-01-01")
      setMaxYear(() => stats.maxYear + "-12-31")
      getData(stats)
    } catch (e) {
      document.getElementById("statsContainer").style.display = "none"

      console.log(e)
    }
  }, [])

  function getData(statsP) {
    const stats = statsP || JSON.parse(localStorage.getItem("stats"))
    const trashList = JSON.parse(localStorage.getItem("trashList"))

    console.log(action)

    if (action === "currentYear") {
      let keysForLoop = []

      for (let i = 0; i < trashList.length; i++) {
        keysForLoop.push(trashList[i].name)
      }

      setKeys(() => keysForLoop)

      console.log(selectedYear.split("-")[0])
      setDataNivo(() => stats.year[selectedYear.split("-")[0]])
    } else if (action === "allYear") {
      console.log("not yet dev")
    }
  }

  return (
    <div className="pageScrollContainer">
      <div id="stats" className="page-frame">
        <div id="statsContainer" className="grid-container">
          <div id="currentYear">
            <div className="datePickerContainer">
              <input
                type="date"
                min={minYear}
                max={maxYear}
                onChange={(event) => {
                  event.preventDefault()
                  setSelectedYear(() => event.target.value)
                  setAction(() => "currentYear")
                  getData()
                }}
              />
            </div>
            <div id="statsContainer">
              <div id="trashStats">
                <p>sqjdkhjkdqsjkhqsdjhkhjkdqshjk</p>
                {/* <ResponsiveBar
                data={dataNivo}
                keys={keys}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                valueFormat={{ format: "", enabled: false }}
                colors={{ scheme: "nivo" }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "month",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "trash",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
              /> */}
              </div>
              <div id="priceStat"></div>
            </div>
          </div>
          <div id="allYear">
            <div className="datePickerContainer"></div>
            <div id="statsContainer">
              <div id="trashStats"></div>
              <div id="priceStat"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
