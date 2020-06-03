const express = require('express');
const app = express();
const { readFile } = require('fs').promises;
// Request is the user's incoming data
// Response Your outgoing data
app.get('/', async (request, response) => {
  response.send(await readFile('./home.html', 'utf8'));
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`App avaiable on http://localhost:3000`)
);
