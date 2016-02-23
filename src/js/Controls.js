'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

const View = Backbone.View.extend({
    el: '#fieldcontrols',
    initialize: (el) => {
        console.log('Controls.view|initialize');
    },
    events: {
        'click #timecontrol': 'startstop'
    },
    startstop: function(e) {
        console.log('click');
       // console.log(e);
    }

});

class Controls {
    constructor() {
        this.view = new View();
    }
}


module.exports = Controls;
    