const name = 'other service -';

export function serviceCall(params) {
    console.log(`${name} serviceCall:`, params);
}

export const options = {
    name: 'serviceOptions',
    values: [1, 2, 3, 4].reverse()
};

export let theVar;
theVar = `${name} initialized after export`;

let methodOne = (text) => console.log(`${name} methodOne:`, text);
let methodTwo = (text) => console.log(`${name} methodTwo:`, text);
export { methodOne, methodTwo as mTwo };

export default function(value) {
    console.log(`${name} default:`, value);
}
