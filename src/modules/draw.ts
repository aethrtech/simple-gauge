//@ts-ignore
import { onmessage } from '../worker/worker'

let blob, worker:any

	//@ts-ignore
	blob = new Blob([('' + onmessage).replace('function onmessage(ev)','onmessage = function(ev)')],{ type:'javascript/worker' })

	worker = new Worker(URL.createObjectURL(blob))


export default function draw(canvas:HTMLCanvasElement, degrees = 0, cb:Function):void{

	let offscreen = canvas.transferControlToOffscreen()

	canvas.setAttribute('width','300px')
	canvas.setAttribute('height','300px')

	document.getElementsByTagName('body')[0].append(canvas)

	worker.postMessage({canvas:offscreen}, [offscreen])

	worker.onmessage = (ev:any) => {

		// worker.terminate()
		cb(null,ev.data)
	}
	// cb()
}
