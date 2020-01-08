import { displayAllData, clearTable, addDataToDom } from "./table.js"
import { nav } from "./navbar.js"

const charSearch = () => {
  nav.classList.add("hidden")
  const name = document.querySelector("input").value

  setTimeout(() => {
    searchName(name).then(data => {
      clearTable()
      if (name.length === 0) {
        displayAllData()
        nav.classList.remove("hidden")
      } else {
        addDataToDom(data)
      }
    })
  }, 1500)
}

async function searchName(name) {
  const response = await fetch(`https://kitsu.io/api/edge/characters?filter[name]=${name}`)
  const json = await response.json()

  return json
}

export const inputSetup = () => {  
  document.querySelector("input").addEventListener("input", charSearch)
}