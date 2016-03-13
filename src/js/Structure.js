'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    log = require('loglevel');


const Model = Backbone.Model.extend({
    defaults: {
        jsclass: 'Structure'
    },
    initialize: function () {
        log.trace(this.get('jsclass') + '.model.init');
    }
});

const MView = Marionette.ItemView.extend({
    jsclass: 'Structure',
    Model: Model,
    $defaultEl: $('#field'),
    template: '<div></div>',
    className: 'structure house',
    initialize: function (opts) {
        log.trace(this.jsclass + ".initialize");
        this.model = new this.Model();
    },
    onBeforeRender: function () {
        log.trace(this.jsclass + ':onBeforeRender');
    },
    onRender: function () {
        log.trace(this.jsclass + ':onRender');
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
        log.trace(this.jsclass + ':clicktest');
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
