
import renderFrame from './render-frame'

export default function animateTo(degreesNew = 0, degreesCurrent = 0, cb){
    //clear animation loop if degrees reaches to degreesNew
    if(degreesCurrent === degreesNew){ 
        return cb()
    }
        let next_degrees
        if(degreesCurrent < degreesNew)
            next_degrees = degreesCurrent + 1;
        else if (degreesCurrent > degreesNew)
            next_degrees = degreesCurrent - 1;
    else next_degrees = degreesCurrent
            
    renderFrame(next_degrees,() => {
        if(next_degrees === degreesNew) return cb()
        degreesCurrent = next_degrees
    });

}