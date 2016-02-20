
// Main bootstrap for our app
// Load at bottom of index.html body.



var Structure = require('./js/Structure.js');
var House = require('./js/House.js');
var Forest = require('./js/Forest.js');
var Controls = require('./js/Controls.js');

var FOV = require('./js/FieldOfView.js');


console.log('Ville Started');

//console.log(Structure);

//Structure.initialize();

new FOV();
new House();
new Forest();
// throws a warning
new Structure();

new Controls('controls');


//console.log(struc);
