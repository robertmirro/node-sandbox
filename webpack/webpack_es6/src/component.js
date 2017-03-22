
import { theVar } from './passThroughByName';

console.log('component what value is other service theVar on init?', theVar);

export function controller(name) {
    console.log('component controller:', name);
    console.log('component what value is other service theVar in controller?', theVar);
}
