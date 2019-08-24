import onmousemove from '../../src/on-mouse-move'
import defaults from '../../src/defaults'
import { equal } from 'assert'

describe('onmousemove', function(){
    it('isSetting == false',function(){
        
        let obj = {
            onmousemove
        }
        Object.defineProperty(obj, 'state', defaults)

        //@ts-ignore
        equal(obj.onmousemove(), false)
    })
    it('isSetting == true',function(){
        
        let obj = {
            onmousemove
        }
        Object.defineProperty(obj, 'state', defaults)
        Object.defineProperty(this,'state',{value:{...this.state,isSetting:true}})


        //@ts-ignore
        equal(obj.onmousemove(), false)
    })
})