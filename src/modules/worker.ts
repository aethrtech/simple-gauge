interface State {
    canvas:any,
    color?: string,
    bgColor?: string,
    lineWidth?: number,
    fontSize?: string,
    font?: string,
    units?: string,
    divisor?: number,
    valueMax?: number
    value?:number,
    degrees?:number,
    valueCurrent?:number,
    toFixed:number,
    isDrawing:boolean,
    loop?:any
}

let Canvas, ctx, isSetting, degreesCurrent, 
state:State = {
canvas : '',
color : 'limegreen', 
bgColor : '#222', 
lineWidth : 30, 
fontSize : '50px', 
font : 'arial', 
units : '',   
degrees : 0, 
divisor : 1,
valueMax: 100,
value:0,
valueCurrent:0,
toFixed:0,
isDrawing:false
}

onmessage = function(ev){
    switch(ev.data.type){
        case 'create': return create(ev.data,function(){
            state.valueCurrent = state.value
            state.degrees = state.value / state.valueMax * 360
            //@ts-ignore
            postMessage({type:ev.data.type,value:ev.data.degrees})
        })
        case 'update':
            
            if (ev.data.value){
                return draw(ev.data.value,function(){
                    state = {...state,...{value:ev.data.value}}
                    //@ts-ignore
                    return postMessage({type:'update',value:ev.data.value})
                }) 
                
            }
            if (ev.data.event === 'onmousedown') isSetting = true
            if (ev.data.event === 'onmouseup')  return isSetting = false
            if (ev.data.event === 'onmousemove' && !isSetting) return
            if (ev.data.event === 'touchmove' && !isSetting) return
            let degreesNew = action(ev.data.data,Canvas,30)
            if (!degreesNew) return
            if (degreesNew === state.degrees) return
            if (state.isDrawing) return
            animate(state.degrees,action(ev.data.data,Canvas,state.lineWidth), function(value, angle){
                state.value = value
                state.isDrawing = false
                state.degrees = angle
                //@ts-ignore
                return postMessage({type:ev.data.type,value})
            })
        case 'restyle':
                return restyle(ev.data.value, function(err){
                    //@ts-ignore
                    return postMessage()
                })
    }

    function restyle(style:object, cb:Function){
        state = {...state, ...style}
    }

    function draw(value:number,callback:Function){

        ctx.clearRect(0, 0, Canvas.width, Canvas.height)

        let degrees = value / state.valueMax *360

        //Background 360 degree arc
        ctx.beginPath()
        ctx.strokeStyle = state.bgColor
        ctx.lineWidth = state.lineWidth
        ctx.arc(Canvas.width/2, Canvas.height/2, Canvas.width/2-state.lineWidth, 0, Math.PI*2, false) //you can see the arc now
        ctx.stroke()
    
        //gauge will be a simple arc
        //Angle in radians = angle in degrees * PI / 180
        var radians = degrees * Math.PI / 180
        ctx.beginPath()
        ctx.strokeStyle = state.color
        ctx.lineWidth = state.lineWidth
        //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
        //the arc will start from the topmost end
        ctx.arc(Canvas.width/2, Canvas.height/2, Canvas.width/2-state.lineWidth, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false) 
        //you can see the arc now
        ctx.stroke()
    
        //Lets add the text
        ctx.fillStyle = state.color
        ctx.font = `${ state.fontSize } ${ state.font }`
        let text = Number(state.valueMax / 360 * degrees).toFixed(state.toFixed) + state.units
        //Lets center the text
        //deducting half of text width from position x
        let text_width = ctx.measureText(text).width
        //adding manual value to position y since the height of the text cannot
        //be measured easily. There are hacks but we will keep it manual for now.
        ctx.fillText(text, Canvas.width/2 - text_width/2, Canvas.height/2 + 15)

        callback(value,degrees)
        
    }

    async function animate(angleOld:number, angleNew:number, cb:Function){
        state = {...state, ...{isDrawing:true}}
        clearInterval(state.loop)
        let { valueMax } = state,
        angleNext = angleOld,
        valueStep = valueMax / 360,
        valueNext = state.value,
        angleDiff = Math.abs(angleOld - angleNew),
        count = 0

        if (angleDiff < 2) return cb(state.value,state.degrees)

        state.loop = setInterval(function(){
            
            requestAnimationFrame(function(){
                draw(valueNext,function(value, angle){
                    if (count > angleDiff) {
                        clearInterval(state.loop)
                        return cb(value, angle)
                    }
                    angleNew > angleOld  ? ++angleNext : --angleNext
                    angleNew > angleOld ? valueNext += valueStep : valueNext -= valueStep
                    ++count
                })
            })
        },0)
        

        // draw the final frame
        // draw(valueNew)
        

    }

    function action(e, canvas, lineWidth){
        let r = Math.sqrt((e.offsetX - canvas.width/2)**2 + (e.offsetY - canvas.width/2)**2)
        if (r > canvas.width/2 - lineWidth + lineWidth/2 || r < canvas.width/2 - lineWidth - lineWidth/2) return
        let quadrant = e.offsetY > 150 ? 180 : 0
        
        // console.log(`quadrant: ${quadrant}`)
        let angle = (Math.atan((e.offsetX - canvas.width/2) / (e.offsetY - canvas.height/2)) * 180 / Math.PI)
        if (e.offsetX < 150 && quadrant === 0) { quadrant = 360; angle = Math.abs(angle) }
        return Math.abs(quadrant - Math.ceil(angle))
        
    }

    function create(data,cb){
        let { canvas  = data,
            color = 'limegreen', 
            bgColor = '#222', 
            lineWidth = 30, 
            fontSize = '50px', 
            font = 'arial', 
            units = '', 
            divisor = 1,
            value,
            toFixed = 0 } = data

        state = {...state, ...data }

        // shallow copy object

        // const canvas = new OffscreenCanvas(canvas.width,canvas.height),
        if (!Canvas) Canvas = canvas
        if (!ctx) ctx = canvas.getContext('2d')
        
            draw(state.value, cb)
    }

}