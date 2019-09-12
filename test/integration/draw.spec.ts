import { strictEqual as equal, notStrictEqual as notEqual, fail } from 'assert'
import simpleGauge from '../../src/modules/index'

describe('Gauge', function(){
    const canvas = document.createElement('div')
    canvas.setAttribute('id','container')
    let currentWorker:any
    beforeEach(function(){
        if (!currentWorker) return
        currentWorker.terminate()
        canvas.removeChild(canvas.childNodes[0])
    })
    it('Draw a new gauge',function(done){
        simpleGauge.create(canvas,0,function(err:any,data:any){
            if (data.data.type !== 'create') return
            currentWorker = data.worker
            err ? fail() : done()
        })
    })
    it('Update',function(done){
        simpleGauge.create(canvas,0,function(err:any,data:any){
            let worker = data.worker
            simpleGauge.update(canvas,90,worker,function(err:any,data:any){
                if (data.data.type !== 'update') return
                err ? fail() : done()
            })
        })
        
        
    })
})