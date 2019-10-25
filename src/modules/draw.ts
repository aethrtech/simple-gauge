//@ts-ignore
import { onmessage } from '../worker/worker'
import events from './events'

export default function draw(container:HTMLElement, degrees = 0, cb:Function):void{

	let blob, worker:any
	console.log('var ctx \n' + onmessage)
	//@ts-ignore
	blob = new Blob([('var ctx,  Canvas, degreesCurrent\n' + onmessage).replace('function onmessage(ev)','onmessage = function(ev)')],{ type:'javascript/worker' })

	worker = new Worker(URL.createObjectURL(blob))

	let canvas = document.createElement('canvas')

	canvas.width = container.offsetWidth
	canvas.height = container.offsetHeight

	container.append(canvas)
	let offscreen
	try {
		offscreen = canvas.transferControlToOffscreen()
	} catch {

	}

	

	worker.postMessage({canvas:offscreen,degrees,type:'create'}, [offscreen])

	worker.onmessage = (ev:any) => {
		switch(ev.data.type){
			case 'create': 
				for (let event of events){
					canvas[event.name] = ({ touches, target, offsetX, offsetY }) => worker.postMessage({event:event.name,
						type:'update',
						data:{ touches, target:{offsetLeft: target.offsetLeft }, offsetX, offsetY }
					})
					
				
			}
			case 'update': return function updated(){

			}
		}
		// worker.terminate()
		//@ts-ignore
		container.postMessage = worker.postMessage
		//@ts-ignore
		container.onmessage = worker.onmessage
		cb(null,{data:ev.data,worker})
	}
	// cb()
}
