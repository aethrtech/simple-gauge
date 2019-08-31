import create from './draw'
import update from './update'

let state = {
    drawn:false,
    degreesCurrent: 0,
    color: 'lightgreen',
    bgColor: '#222',
    text:'',
    isDrawing:false,
    isSetting:false,
    animationLoop:null,
    canvas:null,
    ctx:null
}

export default {
    create,
    update
}