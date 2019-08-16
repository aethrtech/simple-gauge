export function draw(new_degrees = 0, old_degrees = 0){
    //random degree from 0 to 360
    // new_degrees = Math.round(Math.random()*360);
    let difference = Math.abs(new_degrees - degreesCurrent)
    //This will animate the gauge to new positions
    //The animation will take 1 second
    //time for each frame is 1sec / difference in degrees
if (animation_loop){
  clearInterval(animation_loop);
  
}
    animation_loop = setInterval(animate_to,0, new_degrees,null,() => {
  clearInterval(animation_loop);
});
}