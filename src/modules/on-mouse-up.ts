export default function onMouseUp(ev?:any):void{
    Object.defineProperty(this,
        'state',
        {
            value:{
                ...this.state,
                isSetting:false
            },
            writable:true
        })
}