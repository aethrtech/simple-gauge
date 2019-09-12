export default function update(container:HTMLElement, degrees = 0, worker:any,cb:Function):void{

    worker.postMessage({type:'update', degrees})
    cb()

}