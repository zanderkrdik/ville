'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette');


const Model = Backbone.Model.extend({
    defaults: {
        jsclass: 'Structure'
    },
    initialize: function () {
        console.log(this.get('jsclass') + '.model.init');
    }
});

const MView = Marionette.ItemView.extend({
    jsclass: 'Structure',
    Model: Model,
    $defaultEl: $('#field'),
    template: '<div></div>',
    className: 'structure house',
    initialize: function (opts) {
        console.log(this.jsclass + ".initialize");
        this.model = new this.Model();
    },
    onBeforeRender: function () {
        console.log(this.jsclass + ':onBeforeRender');
    },
    onRender: function () {
        console.log(this.jsclass + ':onRender');
        let $attachEl =
            'undefined' !== typeof this.$parentEl ?
                this.$parentEl : this.$defaultEl;
        $attachEl.append(this.$el);
    },
    events: {
        'dblclick': 'preventPropagation',
        'click': 'clicktest'
    },
    preventPropagation: function(e) {
        e.stopPropagation();
    },
    clicktest: function (e) {
        console.log(this.jsclass + ':clicktest');
        this.preventPropagation(e);
        if (!this.model.get('selected')) { 
            $(e.currentTarget).css('background-color','green');
            this.model.set('selected',true);
        } else {
            $(e.currentTarget).css('background-color','');
            this.model.set('selected',false);
        }
    }

});


module.exports = MView;
