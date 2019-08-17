import animateTo from './animate-to'
export default function draw(degreesNew = 0, degreesOld = 0, animationLoop){
    
  if (animationLoop) clearInterval(animationLoop);
    
      animationLoop = setInterval(animateTo,0, degreesNew,null,function(){
    clearInterval(animationLoop);
  });
}