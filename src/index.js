
// Main bootstrap for our app
// Load at bottom of index.html body.

const $ = require('jquery');

var Structure = require('./js/Structure.js');
var House = require('./js/House.js');
var Barn = require('./js/Barn.js');
var Forest = require('./js/Forest.js');
var Controls = require('./js/Controls.js');


var FOV = require('./js/FieldOfView.js');

var Sandbox = require('./js/Sandbox.js');

console.log('Ville Started');

var sandbox = new Sandbox($('#field'));

//var fov = new FOV();
var house = new House({pos: [1,2]});
sandbox.add(house);

var house1 = new House({pos: [4,2]});
sandbox.add(house1);

var house2 = new House({pos: [5,7]});
sandbox.add(house2);

var barn = new Barn({pos: [1,1]});
sandbox.add(barn);
var barn2 = new Barn({pos: [1,10]});
sandbox.add(barn2);
var barn3 = new Barn({pos: [10,10]});
sandbox.add(barn3);
var barn4 = new Barn({pos: [10,1]});
sandbox.add(barn4);

// //house.describe();
// new Forest({x: 2, y: 3});
sandbox.render();

new Controls('controls');

//console.log(struc);
