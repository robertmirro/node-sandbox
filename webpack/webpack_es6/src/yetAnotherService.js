const name = 'yet another service -';

let var1 = `${name} var1`;
let var2 = `${name} var2`;
let var3 = `${name} var3`;
export { var1, var2 as default, var3 as varThree };

export let var4 = `${name} var4`, var5 = `${name} var5`;

const CONST1 = {
    name: `${name} const1 name`,
    value: `${name} const1 va;lue`
};
const CONST2 = {
    name: `${name} const2 name`,
    value: `${name} const2 value`
};

export {
	CONST1,
	CONST2
};

