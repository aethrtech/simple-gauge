import action from '../../src/action'
import { equal } from 'assert'

describe('Action', function(){
    const lineWidth = 30,
    dom = {
        offsetWidth:300
    }

    it('Calculates angle (0)', function(){
        const e = {
            offsetX:150,
            offsetY:0
        }
        equal(action(e, dom, lineWidth),0)
        
    })
    it('Calculates angle (90)', function(){
        const e = {
            offsetX:140,
            offsetY: 150
        }
        equal(action(e, dom, lineWidth),90)
    })
    it('Calculates angle (180)', function(){
        const e = {
            offsetX:150,
            offsetY:140
        }
        equal(action(e, dom, lineWidth),180)
    })
    it('Calculates angle (270)', function(){
        const e = {
            offsetX:10,
            offsetY:0
        }
        equal(action(e, dom, lineWidth),270)
    })
    it('Calculates angle (360)', function(){
        const e = {
            offsetX:150,
            offsetY:0
        }
        equal(action(e, dom, lineWidth),355)
    })
})