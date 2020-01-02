import { offset } from "./globals.js"

export const clearTable = () => {
  while (document.querySelector("table > tbody").firstChild) {
    document.querySelector("table > tbody").removeChild(document.querySelector("table > tbody").firstChild)
  }
  const row = document.createElement("tr")
  const nameTitle = document.createElement("th")
  const descTitle = document.createElement("th")
  nameTitle.innerHTML = "Personagem"
  descTitle.innerHTML = "Descrição"
  row.classList.add("flex")
  row.appendChild(nameTitle)
  row.appendChild(descTitle)
  document.querySelector('table > tbody').appendChild(row)
}

export const displayAllData = () => {

  clearTable()

  fetch(`https://kitsu.io/api/edge/characters?page[limit]=10&page[offset]=${offset}`)
    .then(data => data.json())
    .then(response => {
      response.data.forEach(ele => {
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
    })
}