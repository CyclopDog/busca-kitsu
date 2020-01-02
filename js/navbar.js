import { displayAllData } from "./table.js"
import { nav, offset, setOffset, totalOffset } from "./globals.js"

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
  const arrowLeft = document.createElement("div")
  const arrowRight = document.createElement("div")

  arrowLeft.classList.add("arrow-left")
  arrowRight.classList.add("arrow-right")

  nav.appendChild(arrowLeft)
  nav.appendChild(arrowRight)

  arrowLeft.addEventListener("click", () => {
    if (offset > 0) {
      let newOffset = offset - 10
      setOffset(newOffset)
      displayAllData()
      navArrowsCheck()
    }
  })
  
  arrowRight.addEventListener("click", () => {
    if (offset < totalOffset) {
      let newOffset = offset + 10
      setOffset(newOffset)
      displayAllData()
      navArrowsCheck()
    }
  })
  navArrowsCheck()
}
