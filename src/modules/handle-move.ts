export default function handleMove(e){
    e.preventDefault()
    let x = e.touches[0].clientX - e.target.offsetLeft,
        y = e.touches[0].clientY
    return {offsetX:x,offsetY:y}
  }