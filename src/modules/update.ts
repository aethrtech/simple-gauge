export default function update(value = 0, worker:any):void{

    worker.postMessage({type:'update', value})
}