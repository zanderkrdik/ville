
// Main bootstrap for our app
// Load at bottom of index.html body.

var Structure = require('./js/Structure.js');
var House = require('./js/House.js');
var Barn = require('./js/Barn.js');
var Forest = require('./js/Forest.js');
var Controls = require('./js/Controls.js');

var FOV = require('./js/FieldOfView.js');


console.log('Ville Started');


var fov = new FOV();
var house = new House({pos: [1,2]});

var house1 = new House({pos: [4,2]});

var house2 = new House({pos: [5,7]});

var barn = new Barn({pos: [1,1]});
var barn2 = new Barn({pos: [1,10]});
var barn3 = new Barn({pos: [10,10]});
var barn4 = new Barn({pos: [10,1]});

house.describe();
new Forest({x: 2, y: 3});


new Controls('controls');

//console.log(struc);
