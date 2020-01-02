import { displayAllData, clearTable } from "./table.js"
import { nav } from "./globals.js"

const charSearch = () => {
  nav.classList.add("hidden")
  const name = document.querySelector("input").value
  if (name.length > 3) {
    searchName(name).then(data => {
      clearTable()
      displayResults(data)
    })
  }

  if (name.length === 0) {
    clearTable()
    displayAllData()
    nav.classList.remove("hidden")
  }
}

async function searchName(name) {
  const response = await fetch(`https://kitsu.io/api/edge/characters?filter[name]=${name}`)
  const json = await response.json()

  return json
}

const displayResults = (result) => {
  result.data.forEach(ele => {
    const row = document.createElement("tr")
    const char = document.createElement("td")
    const desc = document.createElement("td")
    const name = document.createElement("div")
    const img = document.createElement("img")
    const ctn = document.createElement("div")
    const animeTitle = document.createElement("div")
    const animeImg = document.createElement("img")

    fetch(`https://kitsu.io/api/edge/anime-characters/${ele.id}/anime`)
      .then(data => data.json())
      .then(response => {    
        let charImg = ele.attributes.image === null ? null : ele.attributes.image.original
        name.innerHTML = ele.attributes.name
        img.src = charImg
        animeImg.src = `https://media.kitsu.io/anime/poster_images/${response.data.id}/small.jpg?1408446922`
        animeTitle.innerHTML = response.data.attributes.titles.en_jp
        desc.appendChild(animeTitle)
        desc.appendChild(animeImg)
    
        row.classList.add('flex')
        img.classList.add('rounded')
        
        ctn.appendChild(img)
        ctn.appendChild(name)
        char.appendChild(ctn)
        row.appendChild(char)
        row.appendChild(desc)
    
        document.querySelector('table > tbody').appendChild(row)
      })
  })
}

export const inputSetup = () => {  
  document.querySelector("input").addEventListener("input", charSearch)
}