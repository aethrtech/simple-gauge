export default function onMouseDown(ev:any,state:any,cb:Function):void{
    cb(Object.defineProperty(this,
        'state',
        {
            value:{
                ...this.state,isSetting:true
            },
            writable:true
        }))
}