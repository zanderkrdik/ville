'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    log = require('loglevel');


const Model = Backbone.Model.extend({
    _banner: null,
    defaults: {
        jsclass: 'Structure'
    },
    initialize: function () {
        this._banner = ''
        //log.trace(this.get('jsclass') + '.model.init');
    }
});

const MView = Marionette.ItemView.extend({
    _banner: null,
    jsclass: 'Structure',
    Model: Model,
    $defaultEl: $('#field'),
    template: '<div></div>',
    className: 'structure house',
    initialize: function (opts) {
        this._banner = this.jsclass + '[' + this.cid + ']';
        log.trace(this._banner + ".initialize");
        //this.model = new this.Model();
    },
    onBeforeRender: function () {
        log.trace(this._banner + ':onBeforeRender');
    },
    onRender: function () {
        log.trace(this._banner + ':onRender');
        this.$defaultEl.append(this.$el);
    },
    events: {
        'dblclick': 'preventPropagation',
        'click': 'clicktest'
    },
    preventPropagation: function(e) {
        log.trace(this._banner + ':preventPropagation');
        e.stopPropagation();
    },
    clicktest: function (e) {
        log.trace(this._banner + ':clicktest');
        e.stopPropagation();
        // if (!this.model.get('selected')) { 
        //     $(e.currentTarget).css('background-color','green');
        //     this.model.set('selected',true);
        // } else {
        //     $(e.currentTarget).css('background-color','');
        //     this.model.set('selected',false);
        // }
    }

});


module.exports = MView;
