'use strict';

var
    $ = require('jquery'),
    Backbone = require('backbone');


class Structure {
    constructor() {
        console.log('Ran Structure()');
        this.view = Backbone.View.extend({
            initialize: function() {
                console.log('Structure.view.init');
            }
        });
    }
};

module.exports = Structure;
