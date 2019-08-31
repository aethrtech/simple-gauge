import init from './init'


export default function Create(container:Container,options?,cb?:Function):void{
    init(container, options, err => {
        if (err) throw new Error(err)
        return cb()
    })
}
