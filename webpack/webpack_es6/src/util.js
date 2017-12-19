// https://netbasal.com/the-importance-of-abstraction-in-js-ea27e07e996

import { findIndex } from 'lodash';

// export { findIndex };

// NOTE: results in build failure: Duplicate declaration "findIndex"
// export function findIndex(array, predicate) {
//     console.log('findIndex:', array);
// }

export function myFindIndex(array) {
    console.log('myFindIndex:', array);
}
