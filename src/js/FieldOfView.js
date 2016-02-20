'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

const View = Backbone.View.extend({
    // Spec either `el` or `tagName` & `className` to bind the view
    el: '#field',

    initialize: function () {
        console.log('FOV.view.init');
        console.log(this.$el.width());
        console.log(this.$el.height());
        this.render();
    },

    render: function () {
        console.log('FOV.view.render');
        //this.$el.css('background-color', 'grey');
    },

    events: {
        'click': 'clicktest'
    },

    clicktest: function () {
        console.log('FOV ping');
    }

});

const Model = Backbone.Model.extend({
    defaults: {
    },
    initialize: function () {
        console.log('FOV.model.init');
    }
});

class FieldOfView {

    constructor() {
        this.model = new Model();
        this.view = new View({ $el: $('#field'), model: this.model });
        this.init();
    }

    static initialize($controls) {
        console.log('FOV.initialize(' + $controls + ')');
    }

    init() { console.warn('FOV.init not overridden') }

}

module.exports = FieldOfView;
