import onmouseup from '../../src/on-mouse-up'
import defaults from '../../src/defaults'
import { equal } from 'assert'

describe('onmousedown', function(){
    it('isSetting = false',function(){
        
        let obj = {
            onmouseup
        }
        Object.defineProperty(obj, 'state', defaults)
  
        obj.onmouseup()

        //@ts-ignore
        equal(obj.state.isSetting, false)
    })
})