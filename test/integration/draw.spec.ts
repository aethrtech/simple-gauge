import { strictEqual as equal, notStrictEqual as notEqual, fail } from 'assert'
import simpleGauge from '../../src/modules/index'

describe('Gauge', function(){
    const canvas = document.createElement('canvas')
    it('Draw a new gauge',function(done){
        simpleGauge.create(canvas,0,function(err:any,data:any){
            err ? fail() : done()
        })
    })
    it('Update',function(done){

        simpleGauge.update(canvas,0,function(err:any,data:any){
            err ? fail() : done()
        })
        
    })
})