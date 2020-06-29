const fs = require('fs-extra');
const concat = require('concat');

// Grabs js files from production and concats them in a single file
(async function build() {

  const files = [
    './dist/elementsAngular/main.js',
    './dist/elementsAngular/polyfills.js',
    './dist/elementsAngular/runtime.js',
    // './dist/elementsAngular/scripts.js',
  ]

  await fs.ensureDir('elements')

  await concat(files, 'elements/user-poll.js')
  console.info('Elements created successfully!')

})();
