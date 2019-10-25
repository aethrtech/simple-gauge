var Canvas, ctx, degreesNew

export const onmessage = function(ev){
    console.log(ev)
    switch(ev.data.type){
        case 'create': return create(ev.data,function(){
            //@ts-ignore
            postMessage({type:ev.data.type})
        })
        case 'update':
            let degreesNew = action(ev.data.data,Canvas,30)
            if (degreesNew === degreesCurrent) return
            degreesCurrent = degreesNew
            create({degrees:degreesNew}, function(){
                //@ts-ignore
                postMessage({type:ev.data.type})
            })

        
    }

    function action(e, canvas, lineWidth){
        let r = Math.sqrt((e.offsetX - canvas.width/2)**2 + (e.offsetY - canvas.width/2)**2)
        if (r > canvas.width/2 - lineWidth + lineWidth/2 || r < canvas.width/2 - lineWidth - lineWidth/2) return
        let quadrant = e.offsetY > 150 ? 180 : 0
        if (e.offsetX < 150 && quadrant === 0) quadrant = 360
        let angle = Math.ceil(Math.atan((e.offsetX - canvas.width/2) / (e.offsetY - canvas.width/2)) * 180 / Math.PI)
        return Math.abs(quadrant - Math.abs(Math.ceil(angle)))
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

        // shallow copy object

        // const canvas = new OffscreenCanvas(canvas.width,canvas.height),
        if (!Canvas) Canvas = canvas
        if (!ctx) ctx = canvas.getContext('2d')
        //Clear the canvas everytime a chart is drawn
        ctx.clearRect(0, 0, Canvas.width, Canvas.height)
    
    
        let text = ''
    
        //Background 360 degree arc
        ctx.beginPath()
        ctx.strokeStyle = bgColor
        ctx.lineWidth = lineWidth
        ctx.arc(Canvas.width/2, Canvas.height/2, Canvas.width/2-lineWidth, 0, Math.PI*2, false) //you can see the arc now
        ctx.stroke()
    
        //gauge will be a simple arc
        //Angle in radians = angle in degrees * PI / 180
        var radians = degrees * Math.PI / 180
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
        //the arc will start from the topmost end
        ctx.arc(Canvas.width/2, Canvas.height/2, Canvas.width/2-lineWidth, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false) 
        //you can see the arc now
        ctx.stroke()
    
        //Lets add the text
        ctx.fillStyle = color
        ctx.font = `${ fontSize } ${ font }`
        text = Math.ceil(degrees / 360 * divisor) + units
        //Lets center the text
        //deducting half of text width from position x
        let text_width = ctx.measureText(text).width
        //adding manual value to position y since the height of the text cannot
        //be measured easily. There are hacks but we will keep it manual for now.
        ctx.fillText(text, Canvas.width/2 - text_width/2, Canvas.height/2 + 15)
        cb()
    }

}