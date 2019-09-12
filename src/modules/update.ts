export default function update(container:HTMLElement, degrees = 0, worker:any,cb:Function):void{

    worker.postMessage({type:'update', degrees})

    worker.onmessage = function(ev:any){
        cb(null, {data:{type:'update'}})
    }

}