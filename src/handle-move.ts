import action  from './action'

export default function handleMode(e){
    e.preventDefault()
    let x = e.touches[0].clientX - e.target.offsetLeft,
        y = e.touches[0].clientY
    action({offsetX:x,offsetY:y})
  }