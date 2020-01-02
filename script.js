import { clearTable, displayAllData } from "./js/table.js"
import { nav, main } from "./js/globals.js"
import { navBar } from "./js/navbar.js"
import { inputSetup } from "./js/search.js"

async function setup() {
  clearTable()
  document.querySelector("input").disabled = true
  nav.classList.add("hidden")
  const loading = document.createElement("div")
  loading.classList.add("mg-15")
  main.appendChild(loading)
  inputSetup()
  navBar()
  nav.classList.remove("hidden")
  main.removeChild(loading)
  displayAllData()
  document.querySelector("input").disabled = false
}

setup()