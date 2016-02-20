'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

const View = Backbone.View.extend({
    events: {
        'click #time-control': 'startstop'
    },
    initialize: (el) => {
        this.el = el;
        //this.$el = $(this.el);
        console.log('Controls.view|initialize');
        console.log(this.$el);
    },
    startstop: (e) => {
        console.log(e);
    }

});

class Controls {
    constructor(el) {
        this.el = el || 'Controls';
        this.view = new View(this.el);
    }
}


module.exports = Controls;
    