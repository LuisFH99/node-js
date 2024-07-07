/*
    .js -> por defecto utiliza CommJS
    .mjs -> para utilizar ES Modules
    .cjs -> para utilizar CommJS
*/

import { sum, sub, mult } from './sum.mjs';

console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(mult(1, 2));
