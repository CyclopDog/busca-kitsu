import { makeTable, clearTable, displayAllData } from "./js/table.js"
import { navBar, setNavListeners } from "./js/navbar.js"
import { inputSetup } from "./js/search.js"

export default function setup() {
  makeTable()
  inputSetup()
  displayAllData()
  navBar()
  setNavListeners()
}

setup()