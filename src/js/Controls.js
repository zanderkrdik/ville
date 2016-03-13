'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    log = require('loglevel');

const MView = Marionette.ItemView.extend({
    template: '#PlayingFieldControlsView',
    initialize: function() {
        log.trace('.initialize');
    },
    events: {
        'click #timecontrol': 'startstop',
        'click #zoomin': 'zoomin',
        'click #zoomout': 'zoomout'
    },
    onBeforeShow: function() {
        log.trace(':onBeforeShow');        
    },
    onShow: function() {
        log.trace(':onShow');        
    },
    onRender: function() {
        log.trace(':onRender');        
    },
    onBeforeRender: function() {
        log.trace(':onBeforeRender');        
    },
    startstop: function(e) {
        log.trace('.startstop');
    },
    zoomin: function(e) {
        log.trace('.zoomin');
        this.trigger('zoomin');
    },
    zoomout: function(e) {
        log.trace('.zoomout');
        this.trigger('zoomout');
    }

});

module.exports = MView;
    