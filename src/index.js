// Marionette Attempt
'use strict';

var
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette');

var
    //Structure = require('./js/Structure.js'),
    House = require('./js/House.js'),
    Forest = require('./js/Forest.js'),
    Barn = require('./js/Barn.js'),
    PlayingField = require('./js/PlayingField');


// A global view containing all our page elements.
var AppView = Marionette.LayoutView.extend({
    el: null, //let controller define this
    regions: {
        playingfield: '#field'
    },
    initialize: function () {
    },
    events: {
        'click': 'testClick'
    },
    testClick: function (e) {
        console.log('App: testClick');
    }
});


// Create our Application
var App = Marionette.Application.extend({
    initialize: function () {
        this.view = new AppView({ el: 'body' });
    }
});


var app = new App({ container: '#app' });
app.playingfield = new PlayingField();
app.playingfield.add(new House({pos: [1,2]}));
app.playingfield.add(new Forest({pos: [3,3]}));
app.playingfield.add(new Barn({pos: [2,1]}));


// Start history when our application is ready
app.on('start', function (options) {
    Backbone.history.start();
    app.playingfield.render();    
});

// Load some initial data, and then start our application
app.start({});

// ******************************************************************
// Raw Backbone Method
// ******************************************************************
// // Main bootstrap for our app
// // Load at bottom of index.html body.

// const $ = require('jquery');

// // let's define what we want to do
// // simulate the interaction of multiple producers and consumers
// // producer structures create elements
// // consumer structures use elements
// // // some structures can be producers and consumers

// // checkpoints
// //  - app displays a consumer and a producer
// //      -- create a sandbox to place the structures in
// //      -- place structures
// //  - app shows link between consumer and producer
// //  - app shows transport between consumer and producer
// //  - consumer and producer update states accordingly. 

// /*
// const Structure = require();

// let mill = new Structure({
//     type: Consumer,
//     genre: 'Barn'
// });

// let forest = new Structure({
//     type: Producer,
//     genre: 'Forest'
// });
// */


// //var Structure = require('./js/Structure.js');
// var House = require('./js/House.js');
// var Barn = require('./js/Barn.js');
// //var Forest = require('./js/Forest.js');
// var Controls = require('./js/Controls.js');


// var Sandbox = require('./js/Sandbox.js');

// console.log('Ville Started');

// var sandbox = new Sandbox($('#field'));

// var house = new House({pos: [1,2]});
// sandbox.add(house);
// var barn = new Barn({pos: [1,1]});
// sandbox.add(barn);
// var barn2 = new Barn({pos: [1,10]});
// sandbox.add(barn2);

// var house1 = new House({pos: [4,2]});
// sandbox.add(house1);

// var house2 = new House({pos: [5,7]});
// sandbox.add(house2);

// var barn3 = new Barn({pos: [10,10]});
// sandbox.add(barn3);
// var barn4 = new Barn({pos: [10,1]});
// sandbox.add(barn4);
// sandbox.add(barn4);



// // //house.describe();
// // new Forest({x: 2, y: 3});
// sandbox.render();


// //barn.model.set('pos',[2,2]);


// new Controls('#field-controls');

// //console.log(struc);


