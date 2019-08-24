import onmousedown from '../../src/on-mouse-down'
import defaults from '../../src/defaults'
import { equal } from 'assert'

describe('onmousedown', function(){
    it('isSetting = true',function(){
        
        let obj = {
            onmousedown
        }
        Object.defineProperty(obj, 'state', defaults)
  
        obj.onmousedown()

        //@ts-ignore
        equal(obj.state.isSetting, true)
    })
})