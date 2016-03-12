'use strict';

const Structure = require('./Structure.js');

const MView = Structure.extend({
    jsclass: 'House'
});

// MView.Model.extend({
//    initialize: function() {
//        console.log('init');
//    } 
// });


module.exports = MView;