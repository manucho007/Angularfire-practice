// Regular logs will be called first cause they are in the main thread,
// next is the Promise since is a micro task that runs before the next event loop starts
//  and finally the setTieout since it's a macro task that runs on the next event loop
// L1
console.log("Synchronous 1");

// L2
setTimeout((_: any) => console.log("Timeout 2"), 0);

// L3
Promise.resolve().then(_ => console.log("Promise 3"));

// L4
console.log("Synchronous 4");

// Promise base API is consumed
import * as fetch from "node-fetch";
import { log } from "util";
const fetch2 = require('node-fetch')
const promise = fetch2('https://jsonplaceholder.typicode.com/todos/1');
// fetch the data and returns it as a promise of the response
promise
    .then((res: { json: () => void; }) => res.json())
    .then((user: { title: any; }) => console.log("User data: ", user.title))
    // .then((user: any) => {
    //     throw new Error('My bad!')
    //     // return user;
    // })
    // Catches any error during the process of the promise
    .catch((err: any) => console.error("There's an error", err));
console.log('Promise 5');

// Example of an async function that returns a promise
const getFruit = async (name: any) => {
    const fruits = {
        pineapple: 'Pineapple',
        apple: 'Apple',
        strawberry: 'Strawberry'
    }
    // With async
    return fruits[name]
    // Without async
    // return Promise.resolve(fruits[name]);
}
getFruit('apple').then(console.log)

// Async +Await function
const makeSmoothie = async () => {
    // It's an error to wait multiple times unless we depend on previous data
    // const a = await getFruit('pineapple');
    // const b = await getFruit('strawberry');
    // return `${a} and ${b} Smoothie`

    // Instead of chain a catch we can add the whole block of code with try
    try {
        // Correct way to get the data
        const a = getFruit('pineapple');
        const b = getFruit('strawberry');
        // We add both promises and makes them run concurrently
        const smoothie = await Promise.all([a, b]);

        // throw 'broken!'

        return smoothie;
    } catch (err) {
        console.log(err);
        return `Chill everything will be ok!`
    }
}
makeSmoothie().then(console.log);

// Array that has values that await an

const fruitsNames = ['banana', 'kiwi', 'melon'];
const fruitLoop = async () => {
    for (const f of fruitsNames) {
        const name = await getFruit(f);
        console.log(name)
    }
}
fruitLoop();