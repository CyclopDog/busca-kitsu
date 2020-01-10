import { main } from "./globals.js"
import Description from "./description.js"
import { nav } from "./navbar.js"

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
  nav.classList.add("hidden")
  const loading = document.createElement("div")
  loading.classList.add("mg-15")
  loading.innerHTML = "Carregando..."
  main.appendChild(loading)


  fetch(`https://kitsu.io/api/edge/characters?page[limit]=10&page[offset]=${history.state.offset}`)
    .then(data => data.json())
    .then(response => {
      main.removeChild(loading)
      nav.classList.remove("hidden")
      addDataToDom(response)
    })
}

export const addDataToDom = (array) => {
  array.data.forEach(ele => {
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
        name.innerHTML = ele.attributes.name
        img.src = ele.attributes.image === null ? "http://placehold.it/225x350" : ele.attributes.image.original
        animeImg.src = `https://media.kitsu.io/anime/poster_images/${response.data.id}/small.jpg?1408446922`
        animeTitle.innerHTML = response.data.attributes.titles.en_jp
        desc.appendChild(animeTitle)
        desc.appendChild(animeImg)
    
        row.classList.add('flex')
        img.classList.add('rounded')

        row.addEventListener("click", () => {
          Description(ele.id)
        })
        
        ctn.appendChild(img)
        ctn.appendChild(name)
        char.appendChild(ctn)
        row.appendChild(char)
        row.appendChild(desc)
    
        document.querySelector('table > tbody').appendChild(row)
      })
  })
}

export const makeTable = () => {
  const container = document.createElement("div")
  container.classList.add("char-table")
  main.appendChild(container)
  const form = document.createElement("form")
  form.classList.add("char-form")
  container.appendChild(form)
  const div = document.createElement("div")
  form.appendChild(div)
  const label = document.createElement("label")
  label.setAttribute("for", "char-search")
  label.classList.add("red")
  label.innerHTML = "Nome do Personagem"
  div.appendChild(label)
  const inputContainer = document.createElement("div")
  div.appendChild(inputContainer)
  const input = document.createElement("input")
  input.setAttribute("type", "text")
  input.setAttribute("name", "char-search")
  inputContainer.appendChild(input)

  const table = document.createElement("table")
  container.appendChild(table)
  const tbody = document.createElement("tbody")
  table.appendChild(tbody)
}