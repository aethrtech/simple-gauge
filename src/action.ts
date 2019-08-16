import { draw } from './draw'

export function action(e){
    let r = Math.sqrt((e.offsetX - W/2)**2 + (e.offsetY - W/2)**2)
    if (r > 141 || r < 110) return
    // console.log(`${e.offsetX - W/2},${W/2 - e.offsetY}`)
    // console.log(e.offsetY)
    let quadrant = e.offsetY > 150 ? 180 : 0
    if (e.offsetX < 150 && quadrant === 0) quadrant = 360
    // console.log(`quadrant: ${quadrant}`)
    let angle = (Math.atan((e.offsetX - W/2) / (e.offsetY - W/2)) * 180 / Math.PI)
    // console.log('drawing')
    if (angle === degreesCurrent) return
    // console.log(Math.abs(quadrant - Math.floor(angle)))
    
    draw(Math.abs(quadrant - Math.ceil(angle)), degreesCurrent)
  }