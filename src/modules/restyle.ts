export default function restyle(style:object,worker:Worker){

    worker.postMessage({type:'restyle',value:style})

}