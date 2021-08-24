import React, { useEffect, useState } from "react"

import { Bar, Doughnut } from "react-chartjs-2"

import "./../css/Stats.css"
import "./../css/Main.css"

function Stats() {
  // currentYear variables

  const [dataChartT, setDataChartT] = useState("none")
  const [dataChartP, setDataChartP] = useState(0)

  const [minYear, setMinYear] = useState("none")
  const [maxYear, setMaxYear] = useState("none")
  const [selectedYear, setSelectedYear] = useState("none")

  // allYear variables

  const [dataChartT2, setDataChartT2] = useState("none")
  const [dataChartP2, setDataChartP2] = useState(0)

  const [maxGraphSize, setMaxGraphSize] = useState(12)

  useEffect(() => {
    var stats = localStorage.getItem("stats")

    try {
      stats = JSON.parse(stats)
      let a = stats.minYear
      setMinYear(() => stats.minYear + "-01-01")
      setMaxYear(() => stats.maxYear + "-12-31")
      setSelectedYear(() => `${new Date().getFullYear()}-01-01`)

      getDataAll()

      // // console.log("component is mounted")
    } catch (e) {
      document.getElementById("statsContainer").style.display = "none"

      // console.log(e)
    }
  }, [])

  useEffect(() => {
    getDataCurrent()
  }, [selectedYear])

  function getDataCurrent(statsP) {
    const stats = statsP || JSON.parse(localStorage.getItem("stats"))
    const trashList = JSON.parse(localStorage.getItem("trashList"))

    // console.log("Defined stats for the current year")

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

    // console.log(stats)
    // console.log(stats.year[selectedYear.split("-")[0]])

    for (let i in stats.year[selectedYear.split("-")[0]]) {
      // console.log(i)
      let trashColor = ""

      for (let iColor = 0; iColor < trashList.length; iColor++) {
        // console.log("\n", i, trashList[iColor].name)
        // console.log(i === trashList[iColor].name)

        if (i === trashList[iColor].name) {
          trashColor = trashList[iColor].color
          // console.log(trashColor)

          dataP.labels.push(i)

          let price = 0

          stats.year[selectedYear.split("-")[0]][i].forEach((element) => {
            // console.log(price)
            price += element
          })

          // console.log(trashList[iColor].price)
          // console.log(price * trashList[iColor].price)

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

    // console.log(selectedYear.split("-")[0], dataT, dataP)
    setDataChartT(() => dataT)
    setDataChartP(() => dataP)
  }

  function getDataAll(statsP) {
    // console.log("getDataAll")
    const stats = statsP || JSON.parse(localStorage.getItem("stats"))
    const trashList = JSON.parse(localStorage.getItem("trashList"))

    const dataT2 = {
      labels: [],
      datasets: [],
    }

    const dataP2 = {
      labels: [],
      datasets: [
        {
          label: "trashPrice",
          data: [],
          backgroundColor: [],
        },
      ],
    }

    const dataP2Info = {}

    dataT2.labels = Object.keys(stats.year)

    trashList.forEach((element) => {
      dataP2.labels.push(element.name)
      dataP2Info[element.name] = { price: element.price, color: element.color }
    })

    dataP2.datasets[0].data = new Array(dataP2.labels.length)
    dataP2.datasets[0].backgroundColor = new Array(dataP2.labels.length)

    for (let i = 0; i < dataT2.labels.length; i++) {
      for (let iTrash in stats.year[dataT2.labels[i]]) {
        let trashExist = false
        let trashCount = 0

        dataT2.datasets.forEach((element, index) => {
          if (iTrash === element.label) {
            trashExist = true

            stats.year[dataT2.labels[i]][iTrash].forEach((count) => {
              trashCount += count
            })

            dataT2.datasets[index].data[i] = trashCount
          }
        })

        if (!trashExist) {
          trashList.forEach((element) => {
            if (element.name === iTrash) {
              dataT2.datasets.push({
                label: iTrash,
                data: new Array(dataT2.labels.length),
                backgroundColor: element.color,
              })

              stats.year[dataT2.labels[i]][iTrash].forEach((count) => {
                trashCount += count
              })

              dataT2.datasets[dataT2.datasets.length - 1].data[i] = trashCount
            }
          })
        }
      }
    }

    for (let iYear in stats.year) {
      for (let iTrash in stats.year[iYear]) {
        let index = dataP2.labels.findIndex((element) => element === iTrash)

        if (index === -1) {
          console.error("ERROR WHILE CREATING DATAP2, index is equal to -1")
        } else {
          let price = 0

          stats.year[iYear][iTrash].forEach((element) => {
            price += element
          })

          // console.log(dataP2Info[iTrash], iTrash, price)

          if (dataP2.datasets[0].data[index]) {
            dataP2.datasets[0].data[index] += price * dataP2Info[iTrash].price
          } else {
            dataP2.datasets[0].data[index] = price * dataP2Info[iTrash].price
          }

          if (!dataP2.datasets[0].backgroundColor[index]) {
            dataP2.datasets[0].backgroundColor[index] = dataP2Info[iTrash].color
          }
        }
      }
    }

    // console.log(dataT2, dataP2, dataP2Info)
    setDataChartT2(() => dataT2)
    setDataChartP2(() => dataP2)
  }

  return (
    <div className="pageScrollContainer">
      <div id="stats" className="page-frame">
        <div id="statsContainer" className="grid-container">
          <div id="currentYear">
            <div className="datePickerContainer">
              <h1>
                Stats of the year <em>{selectedYear.split("-")[0]}</em>
              </h1>
              <input
                type="date"
                min={minYear}
                max={maxYear}
                value={selectedYear}
                onChange={(event) => {
                  event.preventDefault()
                  setSelectedYear(() => event.target.value)
                  getDataCurrent()
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
            </div>
            <div id="graphContainer">
              <div id="trashStats">
                <Bar
                  id="trashStatsGraph"
                  data={dataChartT2}
                  options={{
                    plugins: {
                      title: {
                        text: `All years trash`,
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
                  data={dataChartP2}
                  options={{
                    plugins: {
                      title: {
                        text: `All spends money`,
                        display: true,
                      },
                    },
                    responsive: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
