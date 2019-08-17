export default function action(e:any, canvas:any, state, cb){
    let r = Math.sqrt((e.offsetX - canvas.width/2)**2 + (e.offsetY - canvas.width/2)**2)
    if (r > 141 || r < 110) return
    
    let quadrant = e.offsetY > 150 ? 180 : 0
    if (e.offsetX < 150 && quadrant === 0) quadrant = 360
    
    let angle = (Math.atan((e.offsetX - canvas.width/2) / (e.offsetY - canvas.width/2)) * 180 / Math.PI)
    
    if (angle === state.degreesCurrent) return cb()   
  }