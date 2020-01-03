import { displayAllData } from "./table.js"
import { nav, offset, setOffset, totalOffset } from "./globals.js"

const isMob = matchMedia("(max-width: 768px)")
const arrowLeft = document.createElement("div")
const arrowRight = document.createElement("div")

const pageButtons = () => {
  while (nav.firstChild) {
    nav.removeChild(nav.firstChild)
  }
  nav.appendChild(arrowLeft)
  const currentPage = document.createElement("div")
  const page = offset / 10 + 1
  currentPage.classList.add("page", "active")
  currentPage.innerHTML = page
  if (isMob.matches) {
    if (offset === 0) {
      nav.appendChild(currentPage)
      for (let i = page + 1; i <= page + 2; i++) {
        const nextPage = document.createElement("div")
        nextPage.innerHTML = i
        nextPage.classList.add("page")
        nav.appendChild(nextPage)
      }
    } else if (offset === totalOffset) {
      for (let i = page - 1; i >= page - 2; i--) {
        const prevPage = document.createElement("div")
        prevPage.classList.add("page")
        prevPage.innerHTML = i
        nav.appendChild(prevPage)
      }
      nav.appendChild(currentPage)
    } else {
      const nextPage = document.createElement("div")
      const prevPage = document.createElement("div")
      nextPage.innerHTML = page + 1
      prevPage.innerHTML = page - 1
      nextPage.classList.add("page")
      prevPage.classList.add("page")
      nav.appendChild(prevPage)
      nav.appendChild(currentPage)
      nav.appendChild(nextPage)
    }
  } else {
    switch (offset) {
      case 0:
        nav.appendChild(currentPage)
        for (let i = page + 1; i <= page + 4; i++) {
          const nextPage = document.createElement("div")
          nextPage.classList.add("page")
          nextPage.innerHTML = i
          nav.appendChild(nextPage)
        }        
        break;
      
      case totalOffset:
        for (let i = page - 4; i <= page - 1; i++) {
          const prevPage = document.createElement("div")
          prevPage.innerHTML = i
          prevPage.classList.add("page")
          nav.appendChild(prevPage)
        }
        nav.appendChild(currentPage)
        break;

      case 10:
        const prevPage = document.createElement("div")
        prevPage.innerHTML = page - 1
        prevPage.classList.add("page")
        nav.appendChild(prevPage)
        nav.appendChild(currentPage)
        for (let i = page + 1; i <= page + 3; i++) {
          const nextPage = document.createElement("div")
          nextPage.innerHTML = i
          nextPage.classList.add("page")
          nav.appendChild(nextPage)
        }
        break;
    
      default:
        for (let i = page - 2; i <= page - 1; i++) {
          const prevPage = document.createElement("div")
          prevPage.innerHTML = i
          prevPage.classList.add("page")
          nav.appendChild(prevPage)
        }
        nav.appendChild(currentPage)
        for (let i = page + 1; i <= page + 2; i++) {
          const nextPage = document.createElement("div")
          nextPage.innerHTML = i
          nextPage.classList.add("page")
          nav.appendChild(nextPage)
        }
        break;
    }
  }
  nav.appendChild(arrowRight)

  const pageBtns = document.querySelectorAll(".page")
  pageBtns.forEach(ele => {
    if (parseInt(ele.innerHTML) === page) {
      ele.classList.add("active")
    } else {
      ele.classList.remove("active")
    }
    ele.addEventListener("click", () => {
      setOffset((parseInt(ele.innerHTML) - 1) * 10)
      navArrowsCheck()
      displayAllData()
      pageButtons()
    })
  })
}

isMob.addListener(pageButtons)

const navArrowsCheck = () => {
  const leftArrow = document.querySelector(".arrow-left")
  const rightArrow = document.querySelector(".arrow-right")

  if (offset === 0) {
    leftArrow.classList.add("inactive")
  } else {
    leftArrow.classList.remove("inactive")
  }

  if (offset === totalOffset) {
    rightArrow.classList.add("inactive")
  } else {
    rightArrow.classList.remove("inactive")
  }
}

export const navBar = () => {
  arrowLeft.classList.add("arrow-left")
  arrowRight.classList.add("arrow-right")

  pageButtons()

  arrowLeft.addEventListener("click", () => {
    if (offset > 0) {
      let newOffset = offset - 10
      setOffset(newOffset)
      displayAllData()
      navArrowsCheck()
      pageButtons()
    }
  })
  
  arrowRight.addEventListener("click", () => {
    if (offset < totalOffset) {
      let newOffset = offset + 10
      setOffset(newOffset)
      displayAllData()
      navArrowsCheck()
      pageButtons()
    }
  })
  navArrowsCheck()
}
