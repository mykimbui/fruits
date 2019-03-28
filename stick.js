let i = 0
// const images = ["images/fruit"+i+".png"]
function placeImage(x,y) {
  // const nextImage = images[i]
  const nextImage = "images/fruit"+i+".png"
  const img = document.createElement('img')
  img.setAttribute('src', nextImage)

  img.style.left = x + 'px'
  img.style.top = y + 'px'
  img.style.transform = "translate(-50%, -50%) scale(0.2) rotate(" + (Math.random() * 20 - 10) + "deg)"

  document.body.appendChild(img)
  i = i + 1
  if ( i >= 31) {
    i = 0
  }
}

document.body.addEventListener("click", function(event) {
  event.preventDefault()
  const posLeft = event.pageX
  const posTop = event.pageY
  placeImage(posLeft, posTop)
})
