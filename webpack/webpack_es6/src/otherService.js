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

export async function asyncFn() {
    console.log('asyncFn await started');
    const p = await promiseFn('async');
    console.log('asyncFn await complete');
    return p;
}

export async function asyncValueFn() {
    return 44;
}

export function promiseFn(mode = 'promise') {
    return Promise
        .resolve(1)
        .then(x => x * 4)
        .then(x => x + 8)
        .then(x => x / 3)
        .then(x => {
            console.log(`promise resolved ${mode}, x: ${x}`);
            return x;
        });
}
