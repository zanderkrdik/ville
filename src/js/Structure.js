'use strict';

var
    $ = require('jquery'),
    Backbone = require('backbone');


class Structure {
    constructor() {
        console.log('Ran Structure()');
        this.view = Backbone.View.extend({
            
        });
    }
};

module.exports = Structure;
