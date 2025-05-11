const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js') + '');

async function tests1() {
    let unsortedArray1 = [2, 3, 4, 1];
    let sortedArray1 = [1, 2, 3, 4];
    let res1 = await main(unsortedArray1);
    //console.log(res1);
    assert.deepStrictEqual(res1, sortedArray1); 
}

async function tests2() {
    let unsortedArray2 = [3, 1, 6, 7, 2, 5, 4, 8];
    let sortedArray2 = [1, 2, 3, 4, 5, 6, 7, 8];
    let res2 = await main(unsortedArray2);
    assert.deepStrictEqual(res2, sortedArray2); 
}

async function tests3() {
    let unsortedArray3 = [];
    let sortedArray3 = [];
    let res3 = await main(unsortedArray3);
    assert.deepStrictEqual(res3, sortedArray3); 
}

async function tests4() { 
    let unsortedArray4 = [1];
    let sortedArray4 = [1];
    let res4 = await main(unsortedArray4);
    assert.deepStrictEqual(res4, sortedArray4); 
}

tests1();
tests2();
tests3();
tests4();
