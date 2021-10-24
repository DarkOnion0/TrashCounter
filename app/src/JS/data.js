import axios from "axios"

function importData(type) {
  function parseData(text) {
    const textJSON = JSON.parse(text)

    // console.log(textJSON)

    for (const i in textJSON) {
      // console.log(i, textJSON[i])*
      if (i === "calendar") {
        for (const iCalendar in textJSON[i]) {
          localStorage.setItem(
            iCalendar,
            JSON.stringify(textJSON[i][iCalendar])
          )
        }
      } else {
        localStorage.setItem(i, JSON.stringify(textJSON[i]))
      }
    }
  }

  if (type === "local") {
    const importData = document.createElement("input")
    importData.setAttribute("type", "file")
    importData.setAttribute("id", "inputDoc")

    document.getElementById("invisibleZone").appendChild(importData)

    importData.click()

    importData.addEventListener("change", () => {
      try {
        document
          .getElementById("inputDoc")
          .files[0].text()
          .then((text) => {
            parseData(text)
            importData.remove()
          })
      } catch (e) {
        console.log(e)
        importData.remove()
      }
    })
  } else if (type === "github") {
    const res = axios
      .get(
        `https://api.github.com/gists/${JSON.parse(
          localStorage.getItem("gistId")
        )}`,
        {
          headers: {
            Authorization: `token ${JSON.parse(
              localStorage.getItem("githubToken")
            )}`,
          },
        }
      )
      .then((response) => {
        console.log(
          JSON.parse(response.data.files["localStorage.json"].content)
        )
        parseData(response.data.files["localStorage.json"].content)
      })
  }
}

function exportData(type) {
  const localData = {}
  const calendar = {}

  localData["trashList"] = JSON.parse(localStorage.getItem("trashList"))
  localData["stats"] = JSON.parse(localStorage.getItem("stats"))

  if (localData["trashList"]) {
    for (let i = 0; i < localData["trashList"].length; i++) {
      calendar[`calendar${localData["trashList"][i].name.toUpperCase()}`] =
        JSON.parse(
          localStorage.getItem(
            `calendar${localData["trashList"][i].name.toUpperCase()}`
          )
        )
    }

    localData["calendar"] = calendar
  }

  console.log(localData)

  if (type === "local") {
    // localData["sync"] = JSON.parse(localStorage.getItem("sync"))
    // localData["githubToken"] = JSON.parse(localStorage.getItem("githubToken"))
    const file = new Blob([JSON.stringify(localData, null, 2)], {
      type: "application/json",
    })

    const fileUrl = URL.createObjectURL(file)

    const exportData = document.createElement("a")
    exportData.setAttribute("href", fileUrl)
    exportData.setAttribute("download", "TrashCounterSettings.json")

    document.getElementById("invisibleZone").appendChild(exportData)

    exportData.click()

    exportData.remove()
  } else if (type === "github") {
    const gistRequest = axios
      .patch(
        `https://api.github.com/gists/${JSON.parse(
          localStorage.getItem("gistId")
        )}`,
        {
          files: {
            "localStorage.json": {
              content: JSON.stringify(localData, null, 2),
            },
          },
        },
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${JSON.parse(
              localStorage.getItem("githubToken")
            )}`,
          },
        }
      )
      .then((gistRequestResponse) => {
        console.log(gistRequestResponse)
      })
  }
}

export default { importData, exportData }
