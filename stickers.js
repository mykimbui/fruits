const grid = document.querySelector('.grid')
let i = 0
// const colors = ['"red"', '"blue"', '"yellow"', '"green"', '"purple"', '"pink"']

function placeImage() {
  for (i = 0; i < 31; i++) {
    const nextImage = "images/fruit"+i+".png"
    const div = document.createElement('div')
    div.classList.add("bg")
    const img = document.createElement('img')
    img.setAttribute('src', nextImage)
    img.style.width = '100px'
    img.style.margin = '0 auto'
    img.style.padding = '70px'
    img.style.placeItem = 'center'
    div.appendChild(img)
    grid.appendChild(div)
  }
}

placeImage()

console.log(colors[Math.floor(Math.random() * colors.length)])
