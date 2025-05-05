import posts from "./posts.js";
import users from "./users.js";

export const data = {
    users, posts
}


/*

import fs from 'fs';

const object = { test: 'hola' }

const json = JSON.stringify(object)

//escribir en el json
fs.writeFile('./test.json', json, (error) => {
    if (error) console.error
    else console.log('data saved')
})

//leer datos
fs.readFile('./test.json', (error, data) => {
    if (error) console.error(error)
    else console.log(JSON.parse(data))
})
*/