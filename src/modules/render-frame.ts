export default function renderFrame(degrees,W,ctx,bgcolor,color,text,text_width,H,cb){
    //Clear the canvas everytime a chart is drawn
    ctx.clearRect(0, 0, W, H);

    //Background 360 degree arc
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 30;
    ctx.arc(W/2, H/2, W/2-25, 0, Math.PI*2, false); //you can see the arc now
    ctx.stroke();

    //gauge will be a simple arc
    //Angle in radians = angle in degrees * PI / 180
    var radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 30;
    //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
    //the arc will start from the topmost end
    ctx.arc(W/2, H/2, W/2-25, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
    //you can see the arc now
    ctx.stroke();

    //Lets add the text
    ctx.fillStyle = color;
    ctx.font = "50px bebas";
    text = Math.ceil(degrees / 360 * 60) + "s";
    //Lets center the text
    //deducting half of text width from position x
    text_width = ctx.measureText(text).width;
    //adding manual value to position y since the height of the text cannot
    //be measured easily. There are hacks but we will keep it manual for now.
    ctx.fillText(text, W/2 - text_width/2, H/2 + 15);
    cb()
}