import events from './events'
import handleMove from './handle-move'
import update from './update'

export default function draw(container:HTMLElement, degrees = 0, cb:Function):void{

	let worker:Worker

	worker = new Worker('./worker.ts')

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
					//@ts-ignore
					container.setAttribute('data-value',ev.data.value)
					container['data-value'] = ev.data.value
					//@ts-ignore
					canvas[event] = ({ target, offsetX, offsetY }) => worker.postMessage({event:event,
						type:'update',
						//@ts-ignore
						data:{ target:{offsetLeft: target.offsetLeft }, offsetX, offsetY, currentValue:container['data-value'] }
					})		
				
				}
				//@ts-ignore
				container.update = function(value){
					update(value, worker)
				}
				canvas.addEventListener('touchmove',(ev) => {
					ev.preventDefault()
					let {touches, target } = ev
					//@ts-ignore
					let x = touches[0].clientX - target.offsetLeft,
					y = touches[0].clientY
					
					worker.postMessage({
						type:'update',
						data:{
							//@ts-ignore
							target:{offsetLeft:target.offsetLeft},
							offsetX:x,offsetY:y

						}
					})
				},false)
				break
			case 'update': 
				container.setAttribute('data-value',ev.data.value)

		}
	}
	
}
