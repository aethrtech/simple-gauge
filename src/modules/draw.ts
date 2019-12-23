import events from './events'
import handleMove from './handle-move'
import update from './update'
import restyle from './restyle'
import destroy from './destroy'

export default function draw(container:HTMLElement, value = 0, options?:any, cb?:Function):void{

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

	worker.postMessage({canvas:offscreen, value, type:'create', ...options}, [offscreen])

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
						data:{ target:{offsetLeft: target.offsetLeft }, offsetX, offsetY }
					})		
				
				}
				//@ts-ignore
				container.update = function(value:number){
					update(value, worker)
				}
				//@ts-ignore
				container.restyle = function(style:object){
					restyle(style,worker)
				}
				//@ts-ignore
				container.destroy = function(callback:object){
					destroy(worker, function(err){
						if (err) return console.error(err)
					})
				}
				return canvas.addEventListener('touchmove',(ev) => {
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
				
			case 'update': 
				return container.setAttribute('data-value',ev.data.value)
			case 'restyle':
				return

		}
	}
	
}
