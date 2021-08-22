import React, { useEffect, useState } from "react"

import { Bar, Doughnut } from "react-chartjs-2"

import "./../css/Stats.css"
import "./../css/Main.css"

function Stats() {
  const [action, setAction] = useState("none")
  const [dataChartT, setDataChartT] = useState("none")
  const [dataChartP, setDataChartP] = useState(0)
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
      setSelectedYear(() => `${new Date().getFullYear()}-01-01`)
      setAction(() => "currentYear")
    } catch (e) {
      document.getElementById("statsContainer").style.display = "none"

      console.log(e)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [action])

  function getData(statsP) {
    const stats = statsP || JSON.parse(localStorage.getItem("stats"))
    const trashList = JSON.parse(localStorage.getItem("trashList"))

    console.log(action)

    if (action === "currentYear") {
      const dataT = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [],
      }

      const dataP = {
        labels: [],
        datasets: [
          {
            label: "trashPrice",
            data: [],
            backgroundColor: [],
          },
        ],
      }

      console.log(JSON.stringify(stats, null, 2))
      console.log(stats.year[selectedYear.split("-")[0]])

      for (let i in stats.year[selectedYear.split("-")[0]]) {
        console.log(i)
        let trashColor = ""

        for (let iColor = 0; iColor < trashList.length; iColor++) {
          console.log("\n", i, trashList[iColor].name)
          console.log(i === trashList[iColor].name)

          if (i === trashList[iColor].name) {
            trashColor = trashList[iColor].color
            console.log(trashColor)

            dataP.labels.push(i)

            let price = 0

            stats.year[selectedYear.split("-")[0]][i].forEach((element) => {
              price += element
            })

            dataP.datasets[0].data.push(price * trashList[iColor].price)
            dataP.datasets[0].backgroundColor.push(trashColor)
          }
        }

        dataT.datasets.push({
          label: i,
          data: stats.year[selectedYear.split("-")[0]][i],
          backgroundColor: trashColor,
          stack: "Stack 0",
        })
      }

      console.log(selectedYear.split("-")[0], dataT, dataP)
      setDataChartT(() => dataT)
      setDataChartP(() => dataP)
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
              <h1>Stats of the year </h1>
              <input
                type="date"
                min={minYear}
                max={maxYear}
                value={selectedYear}
                onChange={(event) => {
                  event.preventDefault()
                  setSelectedYear(() => event.target.value)
                  setAction(() => "currentYear")
                }}
              />
            </div>
            <div id="graphContainer">
              <div id="trashStats">
                <Bar
                  id="trashStatsGraph"
                  data={dataChartT}
                  options={{
                    plugins: {
                      title: {
                        text: `Trash by month in ${selectedYear.split("-")[0]}`,
                        display: true,
                      },
                    },
                    responsive: true,
                    interaction: {
                      intersect: false,
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                />
              </div>
              <div id="priceStat">
                <Doughnut
                  id="priceStatGraph"
                  data={dataChartP}
                  options={{
                    plugins: {
                      title: {
                        text: `Total spend money by trash in ${
                          selectedYear.split("-")[0]
                        }`,
                        display: true,
                      },
                    },
                    responsive: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div id="allYear">
            <div className="datePickerContainer">
              <h1>Stats of years </h1>
              <div id="inputContainer">
                <input
                  type="date"
                  min={minYear}
                  max={maxYear}
                  onChange={(event) => {
                    event.preventDefault()
                    setSelectedYear(() => event.target.value)
                    setAction(() => "currentYear")
                  }}
                />
                <input
                  type="date"
                  min={minYear}
                  max={maxYear}
                  onChange={(event) => {
                    event.preventDefault()
                    setSelectedYear(() => event.target.value)
                    setAction(() => "currentYear")
                  }}
                />
              </div>
            </div>
            <div id="graphContainer">
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
