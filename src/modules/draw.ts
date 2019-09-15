//@ts-ignore
import { onmessage } from '../worker/worker'
import onmousedown from './on-mouse-down'
import onmouseup from './on-mouse-up'
import onmousemove from './on-mouse-move'
import handlemove from './handle-move'
import action from './action'

export default function draw(container:HTMLElement, degrees = 0, cb:Function):void{

	let blob, worker:any

	//@ts-ignore
	blob = new Blob([('' + onmessage).replace('function onmessage(ev)','onmessage = function(ev)')],{ type:'javascript/worker' })

	worker = new Worker(URL.createObjectURL(blob))

	let canvas = document.createElement('canvas')

	canvas.onmousedown = onmousedown
	canvas.onmouseup = onmouseup
	canvas.onmousemove = onmousemove
	canvas.ontouchmove = handlemove


	
	container.append(canvas)
	let offscreen
	try {
		offscreen = canvas.transferControlToOffscreen()
	} catch {

	}

	canvas.setAttribute('width','300px')
	canvas.setAttribute('height','300px')

	worker.postMessage({canvas:offscreen,degrees,type:'create'}, [offscreen])

	worker.onmessage = (ev:any) => {

		// worker.terminate()
		//@ts-ignore
		container.postMessage = worker.postMessage
		//@ts-ignore
		container.onmessage = worker.onmessage
		cb(null,{data:ev.data,worker})
	}
	// cb()
}
