var Pokedex = require('pokedex-promise-v2');

var options = {
    protocol: 'https'
}

var P = new Pokedex(options);

export default P;