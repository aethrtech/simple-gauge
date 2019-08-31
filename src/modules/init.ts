import onmousedown from './on-mouse-down'
import onmouseup from './on-mouse-up'
import onmousemove from './on-mouse-move'
import handleMove from './handle-move'

import draw from './draw'
import defaults from './defaults'

import '../types/container'

export default function Init(container:Container, options?:any, cb?:Function):void{

    const worker = new Worker('./worker')
    
    let canvas = document.createElement('canvas'),

    offscreen = canvas.transferControlToOffscreen()

    defaults.value = {...defaults.value, ...options}

    worker.postMessage({canvas:offscreen, options})

    worker.onmessage = ev => {
        if(ev.data.err) return cb(ev.data.err)
        container.append(canvas)
        container.onmousedown = onmousedown
        container.onmousemove = onmousemove
        container.onmouseup = onmouseup
        container.addEventListener('touchmove',handleMove,false)
        container.draw = draw
        container.defineProperty(this, 'state', defaults)
        worker.terminate()
        cb()
    }
}