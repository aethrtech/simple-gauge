// if ('undefined' === typeof window) importScripts('./create.js')
let currentCanvas

export const onmessage = function(ev){
    switch(ev.data.type){
        case 'create': return create(ev.data,function(){
            //@ts-ignore
            postMessage({type:ev.data.type})
        })
        case 'update': return create(Object.assign(ev.data,{canvas:currentCanvas}),function(){
            //@ts-ignore
            postMessage({type:ev.data.type})
        })
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

        if (canvas) currentCanvas = canvas
    
        // const canvas = new OffscreenCanvas(canvas.width,canvas.height),
        let ctx = canvas.getContext('2d')
        //Clear the canvas everytime a chart is drawn
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    
        let text = ''
    
        //Background 360 degree arc
        ctx.beginPath()
        ctx.strokeStyle = bgColor
        ctx.lineWidth = lineWidth
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2-lineWidth, 0, Math.PI*2, false) //you can see the arc now
        ctx.stroke()
    
        //gauge will be a simple arc
        //Angle in radians = angle in degrees * PI / 180
        var radians = degrees * Math.PI / 180
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
        //the arc will start from the topmost end
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2-lineWidth, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false) 
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
        ctx.fillText(text, canvas.width/2 - text_width/2, canvas.height/2 + 15)
        cb()
    }

}