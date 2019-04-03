const grid = document.querySelector('.grid')
let i = 0
const colors = ['"red"', '"blue"', '"yellow"', '"green"', '"purple"', '"pink"']

function placeImage() {
  for (i = 0; i < 31; i++) {
    const nextImage = "images/fruit"+i+".png"
    const img = document.createElement('img')
    img.setAttribute('src', nextImage)
    img.style.width = '100px'
    img.style.margin = '0 auto'
    img.style.paddingTop = '70px'
    img.style.paddingBottom = '70px'
    img.style.backgroudColor = "colors[Math.floor(Math.random() * colors.length)]"
    grid.appendChild(img)
  }
}

placeImage()

console.log(colors[Math.floor(Math.random() * colors.length)])
