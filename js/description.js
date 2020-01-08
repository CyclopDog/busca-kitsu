import { main } from "./globals.js"
import { makeTable, displayAllData } from "./table.js"
import { navBar } from "./navbar.js"
import { inputSetup } from "./search.js"

export default function Description(id) {
  const charTable = document.querySelector(".char-table")
  fetch(`https://kitsu.io/api/edge/characters/${id}`)
    .then(data => data.json())
    .then(response => {
      main.removeChild(charTable)
      const charDesc = document.createElement("div")
      charDesc.classList.add("char-desc")
      const backText = document.createElement("p")
      backText.innerHTML = "VOLTAR"
      backText.classList.add("red")

      main.appendChild(charDesc)
      charDesc.appendChild(backText)

      const charName = document.createElement("h1")
      charName.innerHTML = response.data.attributes.name
      charDesc.appendChild(charName)

      const charImg = document.createElement("img")
      charImg.src = response.data.attributes.image === null ? "http://placehold.it/225x350" : response.data.attributes.image.original
      charDesc.appendChild(charImg)

      const charAbout = document.createElement("p")
      charAbout.innerHTML = response.data.attributes.description
      charDesc.appendChild(charAbout)

      backText.addEventListener("click", () => {
        main.removeChild(charDesc)
        makeTable()
        displayAllData()
        navBar()
        inputSetup()
      })


    })
}