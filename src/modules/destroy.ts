export default function destroy(worker:Worker, callback:Function){
    try {
        worker.terminate()
    } catch(err){
        return callback(err)
    }
    callback()
}