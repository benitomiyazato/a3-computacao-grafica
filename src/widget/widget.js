
import generateStars from "./functions/stars.js"
import background from "./functions/background.js"
import {generatePlanet, generateMoons} from "./functions/planets.js"

function widget(key, draw) {
    background(draw);
    generateStars(key, draw);

    generateMoons(key, draw);
    generatePlanet(key, draw);
}




export default widget