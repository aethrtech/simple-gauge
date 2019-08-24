export default function onMouseDown(ev?:any):void{
    Object.defineProperty(this,'state',{value:{...this.state,isSetting:false}})
}