//@ts-ignore
import { onmessage } from '../worker/worker'

export default function draw(container:HTMLElement, degrees = 0, cb:Function):void{

	let blob, worker:any

	//@ts-ignore
	blob = new Blob([('' + onmessage).replace('function onmessage(ev)','onmessage = function(ev)')],{ type:'javascript/worker' })

	worker = new Worker(URL.createObjectURL(blob))

	let canvas = document.createElement('canvas')
	
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
