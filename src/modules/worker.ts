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
    degrees?:number
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
value:0 
}

onmessage = function(ev){

    switch(ev.data.type){
        case 'create': return create(ev.data,function(){
            //@ts-ignore
            postMessage({type:ev.data.type,value:ev.data.degrees})
        })
        case 'update':
            if (ev.data.value){
                draw(ev.data.value) 
                state.value = ev.data.value
                //@ts-ignore
                return postMessage({type:'update',value:ev.data.value})
            }
            let degreesNew = action(ev.data.data,Canvas,30)
            if (!degreesNew) return
            if (ev.data.event === 'onmousedown') isSetting = true
            if (ev.data.event === 'onmouseup')  isSetting = false
            if (ev.data.event === 'onmousemove' && !isSetting) return
            if (ev.data.event === 'touchmove' && !isSetting) return
            if (degreesNew === degreesCurrent) return
            animate(ev.data.data.currentValue,action(ev.data.data,Canvas,30), function(value){
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

    function draw(degrees){
        ctx.clearRect(0, 0, Canvas.width, Canvas.height)

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
        // let text = Math.ceil(degrees / 360 * divisor) + units
        // let text = degrees
        let text = state.valueMax / 360 * degrees
        //Lets center the text
        //deducting half of text width from position x
        let text_width = ctx.measureText(text).width
        //adding manual value to position y since the height of the text cannot
        //be measured easily. There are hacks but we will keep it manual for now.
        ctx.fillText(text, Canvas.width/2 - text_width/2, Canvas.height/2 + 15)
        
    }

    async function animate(oldAngle, newAngle,cb){
        let currentAngle = oldAngle
        for (let i = 0; i < Math.abs(newAngle - oldAngle); i++){
            try {
                await new Promise(function(resolve){
                    draw(currentAngle)
                    resolve()
                })
            } catch(err){
                console.error(`\u001b[1;34m${err}\u001b[0m`)
                return cb()
            }
            newAngle > oldAngle ? ++currentAngle : --currentAngle
        }
        // draw the final frame
        draw(currentAngle)
        cb(currentAngle)

    }

    function action(e, canvas, lineWidth){
        let r = Math.sqrt((e.offsetX - canvas.width/2)**2 + (e.offsetY - canvas.width/2)**2)
        if (r > canvas.width/2 - lineWidth + lineWidth/2 || r < canvas.width/2 - lineWidth - lineWidth/2) return
        let quadrant = e.offsetY > 150 ? 180 : 0
        if (e.offsetX < 150 && quadrant === 0) quadrant = 360
        let angle = Math.ceil(Math.atan((e.offsetX - canvas.width/2) / (e.offsetY - canvas.width/2)) * 180 / Math.PI)
        return Math.abs(quadrant - Math.ceil(angle))
    }

    function create(data,cb){
        let { canvas , 
        color = 'limegreen', 
        bgColor = '#222', 
        lineWidth = 30, 
        fontSize = '50px', 
        font = 'arial', 
        units = '',   
        degrees = 0, 
        divisor = 1 } = data

        state = { canvas, color, bgColor, lineWidth, fontSize, font, units, degrees, divisor }

        // shallow copy object

        // const canvas = new OffscreenCanvas(canvas.width,canvas.height),
        if (!Canvas) Canvas = canvas
        if (!ctx) ctx = canvas.getContext('2d')
        
            draw(degrees)

        cb()
    }

}