export default function onMouseUp(ev:any,state:any, cb:Function):void{
    cb(Object.defineProperty(this,
        'state',
        {
            value:{
                ...this.state,
                isSetting:false
            },
            writable:true
        }))
}