const name = 'service -';

export function serviceCall(params) {
    console.log(`${name} serviceCall:`, params);
}

export const options = {
    name: 'serviceOptions',
    values: [1, 2, 3, 4]
};

function methodOne(text) {
    console.log(`${name} methodOne:`, text);
}
function methodTwo(text) {
    console.log(`${name} methodTwo:`, text);
}

export { methodOne, methodTwo as mTwo };

export default function(value) {
    console.log(`${name} default:`, value);
}
